using System;
using System.Collections.Generic;

#nullable disable

namespace WebApplication.DataAccess.EfModels
{
    public partial class Category
    {
        public Category()
        {
            Items = new HashSet<Item>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public long EventId { get; set; }

        public virtual Event Event { get; set; }
        public virtual ICollection<Item> Items { get; set; }
    }
}
