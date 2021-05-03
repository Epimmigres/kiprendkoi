using System;
using System.Collections.Generic;

#nullable disable

namespace WebApplication.DataAccess.EfModels
{
    public partial class Item
    {
        public long Id { get; set; }
        public string Who { get; set; }
        public string What { get; set; }
        public int Quantity { get; set; }
        public long CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}
