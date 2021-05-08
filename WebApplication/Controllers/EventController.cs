using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess.Interfaces;

namespace WebApplication.Controllers
{
    public class EventController : Controller
    {

        private readonly ILogger<EventController> _logger;
        private readonly IEventRepository _eventRepository;
        public EventController(ILogger<EventController> logger, IEventRepository eventRepository)
        {
            _logger = logger;
            _eventRepository = eventRepository;
        }

        public async Task<IActionResult> Index(string eventHash)
        {
            try
            {
                var model = _eventRepository.GetEventByHash(eventHash);
                return View(model);
            }
            catch
            {
                return RedirectToAction("NotFound");
            }
        }

        public IActionResult NotFound()
        {
            return View();
        }
    }
}
