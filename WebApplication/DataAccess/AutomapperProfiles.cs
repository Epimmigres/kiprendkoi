using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.DataAccess
{
    public class AutomapperProfiles : AutoMapper.Profile
    {
        public AutomapperProfiles()
        {
            CreateMap<Dbo.Event, EfModels.Event>();
            CreateMap<EfModels.Event, Dbo.Event>();
            CreateMap<Dbo.Category, EfModels.Category>();
            CreateMap<EfModels.Category, Dbo.Category>();
            CreateMap<Dbo.Item, EfModels.Item>();
            CreateMap<EfModels.Item, Dbo.Item>();
        }
    }
}
