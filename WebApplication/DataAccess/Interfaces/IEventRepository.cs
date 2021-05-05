using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess.Interfaces
{
    public interface IEventRepository : DataAccess.IRepository<EfModels.Event, Dbo.Event>
    {
    }
}
