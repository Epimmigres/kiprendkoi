using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Dbo
{
    public class Event : IObjectWithId
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public DateTime? Date { get; set; }
        public string Location { get; set; }
        public string EventHash { get; set; }
    }
}
