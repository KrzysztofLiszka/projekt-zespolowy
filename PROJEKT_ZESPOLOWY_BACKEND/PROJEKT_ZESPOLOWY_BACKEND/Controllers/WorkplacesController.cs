using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Services;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkplacesController : ControllerBase
    {
        private readonly IWorkplaceService _workplaceService;

        public WorkplacesController(IWorkplaceService workplaceService)
        {
            _workplaceService = workplaceService;
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinWorkplace([FromBody] Guid workplaceUuid)
        {
            await _workplaceService.JoinWorkplace(workplaceUuid);
            return Ok("Joined workplace successfully.");
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddNewWorkplace([FromBody] NewWorkplaceDto workplace)
        {
            if (workplace == null)
            {
                return BadRequest("Workplace data is required.");
            }

            await _workplaceService.AddNewWorkplace(workplace);
            return Ok("Workplace added successfully.");
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditWorkplace([FromBody] EditWorkplaceDto workplace)
        {
            if (workplace == null)
            {
                return BadRequest("Workplace data is required.");
            }

            await _workplaceService.EditWorkplace(workplace);
            return Ok("Workplace updated successfully.");
        }

        [HttpGet]
        public async Task<IActionResult> GetWorkplaces()
        {
            var workplaces = await _workplaceService.GetWorkplaces();
            return Ok(workplaces);
        }

        [HttpDelete("{uuid:guid}")]
        public async Task<IActionResult> DeleteWorkplace([FromRoute] Guid uuid)
        {
            await _workplaceService.DeleteWorkplace(uuid);
            return Ok("Workplace deleted successfully.");
        }
    }
}
