using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string MiddleInitial { get; set; }
        public string LastName { get; set; }               
        public string AvatarUrl { get; set; }
        public string Email { get; set; }
        public LookUp Status { get; set; }
        public List<LookUp> Role { get; set; }


    }
}
