using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            _context = context;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }


        [HttpPost("create-account")]
        public async Task<ActionResult<Account>> CreateAccount([FromQuery] int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("Bruger ikke fundet");
            }

            var account = new Account
            {
                UserId = user.Id,
                Balance = 1,
                CreatedAt = DateTime.UtcNow
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return Ok(account);
        }

    }
}