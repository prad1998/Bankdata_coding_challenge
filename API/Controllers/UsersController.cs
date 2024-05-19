using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUser()
        {
            var user = _context.Users.ToList();
            return user;
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            return _context.Users.Find(id);

        }

        [HttpPost("Login")]
        public ActionResult<dynamic> Login(dynamic model)
        {
            JsonDocument jsonCredential = JsonDocument.Parse(model.ToString());

            string username = jsonCredential.RootElement.GetProperty("username").GetString();
            string password = jsonCredential.RootElement.GetProperty("password").GetString();


            User user = _context.Users.FirstOrDefault(d => d.UserName == username && d.Id.ToString() == password);

            if (user == null)
            {
                return Unauthorized("Forkert Username eller Password");
            }

            return user;
        }



        [HttpPost("create")]
        public async Task<ActionResult<User>> CreateUser(CreateUserDto createUserDto)
        {
            if (_context.Users.Any(u => u.UserName == createUserDto.UserName))
            {
                return BadRequest("Bruger findes allerede");
            }

            var user = new User
            {
                UserName = createUserDto.UserName
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Account>>> GetUserAccounts(int userId)
        {
            var user = await _context.Users.Include(u => u.Accounts).FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Accounts);
        }

        [HttpPost("transfer")]
        public async Task<IActionResult> Transfer([FromBody] TransferDto TransferDto)
        {
            if (TransferDto.Amount <= 0)
            {
                return BadRequest("Beløbet skal være større end 0");
            }

            var sourceAccount = await _context.Accounts.FindAsync(TransferDto.FromAccountId);
            var destinationAccount = await _context.Accounts.FindAsync(TransferDto.ToAccountId);

            if (sourceAccount == null || destinationAccount == null)
            {
                return NotFound("En eller begge konti kunne ikke findes");
            }

            if (sourceAccount.Balance < TransferDto.Amount)
            {
                return BadRequest("Kontoen har ikke tilstrækkelige midler til at fuldføre denne transaktion");
            }

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    sourceAccount.Balance -= TransferDto.Amount;
                    destinationAccount.Balance += TransferDto.Amount;

                    _context.Accounts.Update(sourceAccount);
                    _context.Accounts.Update(destinationAccount);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
            return Ok("Beløb overført");
        }
    }
}