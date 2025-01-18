using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PROJEKT_ZESPOLOWY_BACKEND.Constants;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = $"{Roles.SystemAdmin}, {Roles.Worker}, {Roles.WorkspaceOwner}")]
    public class SchedulesController : ControllerBase
    {
        private readonly ISqlRepository _sqlRepository;

        public SchedulesController(ISqlRepository sqlRepository)
        {
            _sqlRepository = sqlRepository;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddNewSchedule([FromBody] NewScheduleDto newSchedule)
        {
            var schedule = new Schedule
            {
                Hour = newSchedule.Hour,
                Date = newSchedule.Date,
                Name = newSchedule.Name
            };
            await _sqlRepository.AddAsync(schedule);
            return Ok(new { message = "Schedulet added successfully." });
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditSchedule([FromBody] EditScheduleDto editSchedule)
        {
            var schedule = await _sqlRepository.GetAsync<Schedule>(editSchedule.Uuid);
            if(schedule == null) return NotFound("Schedule not found");
            schedule.Hour = editSchedule.Hour;
            schedule.Date = editSchedule.Date;
            schedule.Name = editSchedule.Name;

            await _sqlRepository.UpdateAsync(schedule);
            return Ok(new { message = "Schedule upated successfully." });
        }

        [HttpGet]
        public async Task<IActionResult> GetSchedules()
        {
            var schedules = await _sqlRepository.GetAllAsync<Schedule>();
            return Ok(schedules);
        }

        [HttpGet("paginated/{pageNumber}")]
        public async Task<IActionResult> GetPaginatedSchedules([FromRoute] int pageNumber)
        {
            var schedules = await _sqlRepository.GetPaginatedAsync<Schedule>(pageNumber);
            return Ok(schedules);
        }

        [HttpDelete("{uuid:guid}")]
        public async Task<IActionResult> DeleteSchedule([FromRoute] Guid uuid)
        {
            await _sqlRepository.DeleteAsync<Schedule>(uuid);
            return Ok(new { message = "Schedule deleted successfully." });
        }
    }
}
