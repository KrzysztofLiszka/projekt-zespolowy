using AutoMapper;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;

namespace PROJEKT_ZESPOLOWY_BACKEND.Services
{
    public class VisualizationService : IVisualizationService
    {
        private readonly ISqlRepository _sqlRepository;
        private readonly IMapper _mapper;

        public VisualizationService(ISqlRepository sqlRepository, IMapper mapper)
        {
            _sqlRepository = sqlRepository;
            _mapper = mapper;
        }

        public async Task AddImage(Guid visualizationId, IFormFile file)
        {
            var image = new Image
            {
                VisualizationId = visualizationId,
                Data = ConvertFileToByte(file)
            };
            await _sqlRepository.AddAsync(image);
        }

        public async Task AddItemAsync(Visualization item)
        {
            var visualizations = await _sqlRepository.GetAllAsync<Visualization>();
            item.Name = "Wizualizacja" + (visualizations.Count + 1);
            await _sqlRepository.AddAsync(item);
        }

        public async Task DeleteImage(Guid imageId)
        {
            await _sqlRepository.DeleteAsync<Image>(imageId);
        }

        public async Task DeleteItemAsync(Guid id)
        {
            await _sqlRepository.DeleteAsync<Visualization>(id);
        }

        public async Task<List<Visualization>> GetAllItemsAsync()
        {
            var items = await _sqlRepository.GetAllAsync<Visualization>();
            return items;
        }

        public async Task<Visualization> GetItemByIdAsync(Guid id)
        {
            var item = await _sqlRepository.GetAsync<Visualization>(id);
            if (item == null) throw new Exception("Visualization not found!");
            return item;
        }

        public async Task UpdateItemAsync(Visualization item)
        {
            await _sqlRepository.UpdateAsync(item);
        }

        public async Task<List<ImageDto>> GetImages(Guid visualizationId)
        {
            var allImages = await _sqlRepository.GetAllAsync<Image>();
            var imagesFromVisualization = allImages.Where(x => x.VisualizationId == visualizationId).ToList();
            var imagesDtoList = _mapper.Map<List<ImageDto>>(imagesFromVisualization);

            return imagesDtoList;
        }

        private static byte[] ConvertFileToByte(IFormFile file)
        {
            using var ms = new MemoryStream();
            file.CopyTo(ms);
            var fileBytes = ms.ToArray();

            return fileBytes;
        }
    }
}
