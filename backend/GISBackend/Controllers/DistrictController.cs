using GisBackend.Data;
using GisBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace GisBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DistrictController : ControllerBase
    {
        private readonly GisDbContext _context;

        public DistrictController(GisDbContext context)
        {
            _context = context;
        }

        // GET: api/district
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DistrictInfo>>> GetAllDistricts()
        {
            return await _context.DistrictInfos.ToListAsync();
        }

        // GET: api/district/by-division/30 (e.g., Get all districts in Dhaka)
        [HttpGet("by-division/{divisionPCode}")]
        public async Task<ActionResult<IEnumerable<DistrictInfo>>> GetDistrictsByDivision(int divisionPCode)
        {
            var districts = await _context.DistrictInfos
                                          .Where(d => d.DivisionPCode == divisionPCode)
                                          .ToListAsync();
            return Ok(districts);
        }
    }
}