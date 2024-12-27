using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.Services;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VisualizationController : ControllerBase
    {
        private readonly IVisualizationService _visualizationService;
        private readonly ISqlRepository _sqlRepository;

        public VisualizationController(IVisualizationService visualizationService, ISqlRepository sqlRepository)
        {
            _visualizationService = visualizationService;
            _sqlRepository = sqlRepository;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddNewVisualization()
        {
            var visualization = new Visualization();
            await _sqlRepository.AddAsync(visualization);
            return Ok("Visualization added successfully.");
        }

        [HttpGet]
        public async Task<IActionResult> GetVisualizations()
        {
            var visualizations = await _sqlRepository.GetAllAsync<Visualization>();
            return Ok(visualizations);
        }

        [HttpDelete("{uuid:guid}")]
        public async Task<IActionResult> DeleteVisualization([FromRoute] Guid uuid)
        {
            await _sqlRepository.DeleteAsync<Visualization>(uuid);
            return Ok("Visualization deleted successfully.");
        }


        /// <summary>
        /// IMAGES
        /// </summary>
        /// <param name="visualizationId"></param>
        /// <returns></returns>
        [HttpPost("AddImage/{visualizationId}")]
        public async Task<IActionResult> AddImage([FromRoute] Guid visualizationId)
        {
            await _visualizationService.AddImage(visualizationId, Request.Form.Files[0]);
            return Ok();
        }

        [HttpDelete("DeleteImage/{id}")]
        public async Task<IActionResult> DeleteImage(Guid id)
        {
            await _visualizationService.DeleteImage(id);
            return Ok();
        }

        [HttpGet("GetImages/{visualizationId}")]
        public async Task<IActionResult> GetImages(Guid visualizationId)
        {
            var result = await _visualizationService.GetImages(visualizationId);
            return Ok(result);
        }
    }
}
