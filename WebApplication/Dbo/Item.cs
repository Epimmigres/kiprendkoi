using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Dbo
{
    public class Item : IObjectWithId
    {
        public long Id { get; set; }
        public string Who { get; set; }
        public string What { get; set; }
        public int Quantity { get; set; }
        public long CategoryId { get; set; }
    }
}
