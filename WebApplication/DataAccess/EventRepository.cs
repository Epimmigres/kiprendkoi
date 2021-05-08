using AutoMapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess.EfModels;
using WebApplication.DataAccess.Interfaces;
using WebApplication.Models;

namespace WebApplication.DataAccess
{
    public class EventRepository : Repository<DataAccess.EfModels.Event, Dbo.Event>,IEventRepository
    {
        public EventRepository(kiprendkoiContext context, ILogger<EventRepository> logger, IMapper mapper) : base(context, logger, mapper)
        {
        }

        public EventResponseModel GetEventByHash(string hash)
        {

            var eventObject = _context.Events.Where(elt => elt.EventHash == hash).First();
            var categories = _context.Categories.Where(category => category.EventId == eventObject.Id).ToList();

            var response = new EventResponseModel(eventObject.Id, eventObject.EventHash, eventObject.Name, eventObject.Email,
                eventObject.Location, eventObject.Description, eventObject.Date);

            foreach (var category in categories)
            {
                var itemList = _context.Items.Where(items => items.CategoryId == category.Id).ToList();
                response.AddCategory(category.Id, category.Name, itemList);
            }

            return response;
        }
    }
}
