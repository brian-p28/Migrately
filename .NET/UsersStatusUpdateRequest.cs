using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Users
{
    public class UsersStatusUpdateRequest
    {
        [Required]
        [Range(minimum:1, int.MaxValue)]
        public int Id { get; set; }

        [Required]
        [Range(minimum:1, maximum:5)]
        public int StatusId { get; set; }
    }
}
