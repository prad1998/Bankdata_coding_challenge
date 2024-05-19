using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class User
    {
        public int Id { get; set;}

        public string UserName { get; set;}

         public ICollection<Account> Accounts { get; set; }

    }
}