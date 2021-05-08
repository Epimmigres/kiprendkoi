using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess.Interfaces;
using WebApplication.Dbo;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryAPIController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryAPIController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _categoryRepository.Get();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Category category)
        {
            var result = await _categoryRepository.Insert(category);
            if (result == null) return BadRequest();
            return Ok(result);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(Category category)
        {
            var result = await _categoryRepository.Update(category);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = await _categoryRepository.Delete(id);
            if (result) return NoContent();
            return NotFound();
        }
    }
}
