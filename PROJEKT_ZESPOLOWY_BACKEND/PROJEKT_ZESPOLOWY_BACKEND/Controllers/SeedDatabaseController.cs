using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedDatabaseController : ControllerBase
    {
        private readonly DatabaseSeeder _dbSeeder;

        public SeedDatabaseController(DatabaseSeeder dbSeeder)
        {
            _dbSeeder = dbSeeder;
        }

        [HttpGet("seed-every-table/{num}")]
        public async Task<IActionResult> SeedEveryTable([FromRoute] int num)
        {
            //await _dbSeeder.AddSchedules(num);
            await _dbSeeder.AddVisualizations(num);
            await _dbSeeder.AddWorkplaces(num);
            await _dbSeeder.AddTimeSpents(num);
            await _dbSeeder.AddDocumentations(num);
            await _dbSeeder.AddAssignments(num);
            await _dbSeeder.AddUsers(num);

            return Ok($"Seeded {num} entries for each table!");
        }


    }
}
