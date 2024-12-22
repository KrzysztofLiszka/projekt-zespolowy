using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TimeSpentsController : ControllerBase
    {
        private readonly ISqlRepository _sqlRepository;

        public TimeSpentsController(ISqlRepository sqlRepository)
        {
            _sqlRepository = sqlRepository;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddNewTimeSpent([FromBody] NewTimeSpentDto newTimeSpent)
        {
            var timeSpent = new TimeSpent
            {
                SpentHours = newTimeSpent.SpentHours,
                Date = newTimeSpent.Date
            };
            await _sqlRepository.AddAsync(timeSpent);
            return Ok(new { message = "TimeSpent added successfully." });
        }

            [HttpPut("edit")]
        public async Task<IActionResult> EditTimeSpent([FromBody] EditTimeSpentDto editTimeSpent)
        {
            var timeSpent = await _sqlRepository.GetAsync<TimeSpent>(editTimeSpent.Uuid);
            if (timeSpent == null) return NotFound("TimeSpent not found");
            timeSpent.SpentHours = editTimeSpent.SpentHours;
            timeSpent.Date = editTimeSpent.Date;

            await _sqlRepository.UpdateAsync(timeSpent);
            return Ok(new { message = "TimeSpent updated successfully." });
        }

        [HttpGet]
        public async Task<IActionResult> GetTimeSpents()
        {
            var timeSpents = await _sqlRepository.GetAllAsync<TimeSpent>();
            return Ok(timeSpents);
        }

        [HttpDelete("{uuid:guid}")]
        public async Task<IActionResult> DeleteTimeSpents([FromRoute] Guid uuid)
        {
            await _sqlRepository.DeleteAsync<TimeSpent>(uuid);
            return Ok("TimeSpent deleted successfully.");
        }
    }
}
