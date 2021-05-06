using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.DataAccess.Interfaces
{
    public interface IEventRepository : DataAccess.IRepository<EfModels.Event, Dbo.Event>
    {
        public EventResponseModel GetEventByHash(string hash);
    }
}
