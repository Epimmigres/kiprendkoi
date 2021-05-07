using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess.Interfaces;
using WebApplication.Dbo;

namespace WebApplication.DataAccess
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemAPIController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;

        public ItemAPIController(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _itemRepository.Get();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Item item)
        {
            var result = await _itemRepository.Insert(item);
            if (result == null) return BadRequest();
            return Ok(result);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(Item item)
        {
            var result = await _itemRepository.Update(item);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = await _itemRepository.Delete(id);
            if (result) return NoContent();
            return NotFound();
        }
    }
}
