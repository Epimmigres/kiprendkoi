using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess.Interfaces
{
    public interface ICategoryRepository : DataAccess.IRepository<EfModels.Category, Dbo.Category>
    {
    }
}
