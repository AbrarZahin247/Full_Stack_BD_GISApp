using GisBackend.Data;
using GisBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace GisBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DivisionController : ControllerBase
    {
        private readonly GisDbContext _context;

        public DivisionController(GisDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DivisionInfo>>> GetDivisions()
        {
            return await _context.DivisionInfos.ToListAsync();
        }
    }
}