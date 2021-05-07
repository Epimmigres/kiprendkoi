using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess.Interfaces;
using WebApplication.Dbo;

namespace WebApplication.Controllers.API
{
    public class EventAPIController : Controller
    {
        private readonly IEventRepository _eventRepository;

        public EventAPIController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _eventRepository.Get();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Event eventObject)
        {
            var result = await _eventRepository.Insert(eventObject);
            if (result == null) return BadRequest();
            return Ok(result);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(Event eventObject)
        {
            var result = await _eventRepository.Update(eventObject);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = await _eventRepository.Delete(id);
            if (result) return NoContent();
            return NotFound();
        }
    }
}
