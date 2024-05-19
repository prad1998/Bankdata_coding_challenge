using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateUserDto
    {
        [Required]
        [StringLength(50)]
        public required string UserName { get; set; }
    }
}