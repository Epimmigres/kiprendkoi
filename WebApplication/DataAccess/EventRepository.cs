using AutoMapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess.EfModels;
using WebApplication.DataAccess.Interfaces;

namespace WebApplication.DataAccess
{
    public class EventRepository : Repository<DataAccess.EfModels.Event, Dbo.Event>,IEventRepository
    {
        public EventRepository(kiprendkoiContext context, ILogger<EventRepository> logger, IMapper mapper) : base(context, logger, mapper)
        {

        }
    }
}
