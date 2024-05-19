using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Account
    {
       public int Id { get; set; }
        public decimal Balance { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }

    }
}