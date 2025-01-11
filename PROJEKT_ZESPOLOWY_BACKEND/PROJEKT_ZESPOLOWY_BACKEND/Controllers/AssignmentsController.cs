using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PROJEKT_ZESPOLOWY_BACKEND.Constants;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Services;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = $"{Roles.SystemAdmin}, {Roles.Worker}, {Roles.WorkspaceOwner}")]

    public class AssignmentsController : ControllerBase
    {
        private readonly IAssignmentService _assignmentService;

        public AssignmentsController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddNewAssignment([FromBody] NewAssignmentDto assignment)
        {
            if (assignment == null)
            {
                return BadRequest("Assignment data is required.");
            }

            await _assignmentService.AddNewAssignment(assignment);
            return Ok(new { message = "Schedulet added successfully." });
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditAssignment([FromBody] EditAssignmentDto assignment)
        {
            if (assignment == null)
            {
                return BadRequest("Assignment data is required.");
            }

            await _assignmentService.EditAssignment(assignment);
            return Ok(new { message = "Schedulet added successfully." });
        }

        [HttpGet]
        public async Task<IActionResult> GetAssignments()
        {
            var assignments = await _assignmentService.GetAssignments();
            return Ok(assignments);
        }

        [HttpDelete("{uuid:guid}")]
        public async Task<IActionResult> DeleteAssignment([FromRoute] Guid uuid)
        {
            await _assignmentService.DeleteAssignment(uuid);
            return Ok(new { message = "Schedulet added successfully." });
        }
    }
}
