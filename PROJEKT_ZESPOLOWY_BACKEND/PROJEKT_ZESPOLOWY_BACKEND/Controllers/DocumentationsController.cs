﻿using Microsoft.AspNetCore.Authorization;
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
    public class DocumentationsController : ControllerBase
    {
        private readonly ISqlRepository _sqlRepository;

        public DocumentationsController(ISqlRepository sqlRepository)
        {
            _sqlRepository = sqlRepository;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddNewDocumentation([FromBody] NewDocumentationDto newDocumentation)
        {
            var documentation = new Documentation
            {
                Name = newDocumentation.Name,
                DescriptionHtmlContent = newDocumentation.DescriptionHtmlContent
            };
            await _sqlRepository.AddAsync(documentation);
            return Ok(new { message = "Visualization deleted suceszxfuly" });
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditDocumentation([FromBody] EditDocumentationDto editDocumentation)
        {
            var documentation = await _sqlRepository.GetAsync<Documentation>(editDocumentation.Uuid);
            if (documentation == null) return NotFound("Documentation not found");
            documentation.Name = editDocumentation.Name;
            documentation.DescriptionHtmlContent = editDocumentation.DescriptionHtmlContent;

            await _sqlRepository.UpdateAsync(documentation);
            return Ok(new { message = "Visualization deleted suceszxfuly" });
        }

        [HttpGet]
        public async Task<IActionResult> GetDocumentations()
        {
            var documentations = await _sqlRepository.GetAllAsync<Documentation>();
            return Ok(documentations);
        }

        [HttpGet("{uuid:guid}")]
        public async Task<IActionResult> GetDocumentationById([FromRoute] Guid uuid)
        {
            var item = await _sqlRepository.GetAsync<Documentation>(uuid);
            if (item == null) throw new Exception("Visualization not found!");
            return Ok(item);
        }
        [HttpDelete("{uuid:guid}")]
        public async Task<IActionResult> DeleteDocumentation([FromRoute] Guid uuid)
        {
            await _sqlRepository.DeleteAsync<Documentation>(uuid);
            return Ok(new { message = "Visualization deleted suceszxfuly" });
        }
    }
}
