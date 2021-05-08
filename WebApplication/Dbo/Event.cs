using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Dbo
{
    public class Event : IObjectWithId
    {
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public string Email { get; set; }
        public DateTime? Date { get; set; }
        public string Location { get; set; }
        public string EventHash { get; set; }
    }
}
