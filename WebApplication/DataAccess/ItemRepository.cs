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
    public class ItemRepository : Repository<EfModels.Item, Dbo.Item>, IItemRepository
    {
        public ItemRepository(kiprendkoiContext context, ILogger<ItemRepository> logger, IMapper mapper) : base(context, logger, mapper)
        {
        }
    }
}
