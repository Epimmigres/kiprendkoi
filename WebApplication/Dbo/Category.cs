using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Dbo
{
    public class Category : IObjectWithId
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long EventId { get; set; }
    }
}
