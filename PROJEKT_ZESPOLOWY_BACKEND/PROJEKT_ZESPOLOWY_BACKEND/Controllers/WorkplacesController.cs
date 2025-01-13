using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJEKT_ZESPOLOWY_BACKEND.Constants;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Services;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = $"{Roles.SystemAdmin}, {Roles.Worker}, {Roles.WorkspaceOwner}, {Roles.Accountant}")]
    public class WorkplacesController : ControllerBase
    {
        private readonly IWorkplaceService _workplaceService;

        public WorkplacesController(IWorkplaceService workplaceService)
        {
            _workplaceService = workplaceService;
        }

        [AllowAnonymous]
        [HttpPost("join")]
        public async Task<IActionResult> JoinWorkplace([FromQuery] string workplaceUuid)
        {
            await _workplaceService.JoinWorkplace(Guid.Parse(workplaceUuid));
            return Ok(new { message = "Schedulet added successfully." });
        }

        [AllowAnonymous]
        [HttpPost("add")]
        public async Task<IActionResult> AddNewWorkplace([FromBody] NewWorkplaceDto workplace)
        {
            if (workplace == null)
            {
                return BadRequest("Workplace data is required.");
            }

            await _workplaceService.AddNewWorkplace(workplace);
            return Ok(new { message = "Schedulet added successfully." });
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditWorkplace([FromBody] EditWorkplaceDto workplace)
        {
            if (workplace == null)
            {
                return BadRequest("Workplace data is required.");
            }

            await _workplaceService.EditWorkplace(workplace);
            return Ok(new { message = "Schedulet added successfully." });
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetWorkplaces()
        {
            var workplaces = await _workplaceService.GetWorkplaces();
            return Ok(workplaces);
        }

        [HttpDelete("{uuid:guid}")]
        public async Task<IActionResult> DeleteWorkplace([FromRoute] Guid uuid)
        {
            await _workplaceService.DeleteWorkplace(uuid);
            return Ok(new { message = "Schedulet added successfully." });
        }

        [AllowAnonymous]
        [HttpGet("coworkers")]
        public async Task<IActionResult> GetCoworkers()
        {
            var coworkers = await _workplaceService.GetCooworkers();
            return Ok(coworkers);
        }

        [AllowAnonymous]
        [HttpGet("workersToAssignment")]
        public async Task<IActionResult> GetWorkersToAssignment()
        {
            var coworkers = await _workplaceService.GetWorkersToAssignment();
            return Ok(coworkers);
        }

        /*
        [HttpGet("salaries/{fromDate}/{toDate}")]
        public async Task<IActionResult> GetSalaries([FromRoute] DateTime? fromDate, [FromRoute] DateTime? toDate)
        {
            var salaries = await _workplaceService.GetSalaryDtosAsync();
            return Ok(salaries);
        }*/

        [HttpGet("salaries")]
        public async Task<IActionResult> GetSalaries([FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var salaries = await _workplaceService.GetSalaryDtosAsync(from, to);
            return Ok(salaries);
        }
    }
}
