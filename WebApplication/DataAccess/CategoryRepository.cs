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
    public class CategoryRepository : Repository<DataAccess.EfModels.Category, Dbo.Category>, ICategoryRepository
    {
        public CategoryRepository(kiprendkoiContext context, ILogger<CategoryRepository> logger, IMapper mapper) : base(context, logger, mapper)
        {
        }
    }
}
