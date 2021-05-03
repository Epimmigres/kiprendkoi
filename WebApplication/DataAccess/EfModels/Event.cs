using System;
using System.Collections.Generic;

#nullable disable

namespace WebApplication.DataAccess.EfModels
{
    public partial class Event
    {
        public Event()
        {
            Categories = new HashSet<Category>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public DateTime? Date { get; set; }
        public string Location { get; set; }
        public string EventHash { get; set; }

        public virtual ICollection<Category> Categories { get; set; }
    }
}
