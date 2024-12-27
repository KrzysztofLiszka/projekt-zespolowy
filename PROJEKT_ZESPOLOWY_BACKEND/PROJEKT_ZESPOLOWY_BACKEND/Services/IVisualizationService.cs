using PROJEKT_ZESPOLOWY_BACKEND.DTOs;

namespace PROJEKT_ZESPOLOWY_BACKEND.Services
{
    public interface IVisualizationService
    {
        Task AddImage(Guid visualizationId, IFormFile file);
        Task DeleteImage(Guid imageId);
        Task<List<ImageDto>> GetImages(Guid visualizationId);
    }
}
