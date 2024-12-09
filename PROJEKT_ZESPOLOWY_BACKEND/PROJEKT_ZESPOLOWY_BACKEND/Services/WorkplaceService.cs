using AutoMapper;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;
using System;

namespace PROJEKT_ZESPOLOWY_BACKEND.Services
{
    public class WorkplaceService : IWorkplaceService
    {
        private readonly ISqlRepository _sqlRepository;
        private readonly IMapper _mapper;

        public WorkplaceService(ISqlRepository sqlRepository, IMapper mapper)
        {
            _sqlRepository = sqlRepository;
            _mapper = mapper;
        }

        public async Task AddNewWorkplace(NewWorkplaceDto workplace)
        {
            var newWorkplace = new Workplace
            {
                Name = workplace.Name
            };
            await _sqlRepository.AddAsync(newWorkplace);
        }

        public async Task DeleteWorkplace(Guid uuid)
        {
            await _sqlRepository.DeleteAsync<Workplace>(uuid);
        }

        public async Task EditWorkplace(EditWorkplaceDto workplace)
        {
            var editWorkplace = await _sqlRepository.GetAsync<Workplace>(workplace.Uuid);
            if (editWorkplace == null) return;
            editWorkplace.Name = workplace.Name;
            await _sqlRepository.UpdateAsync(editWorkplace);
        }

        public async Task<List<WorkplaceTableDto>> GetWorkplaces()
        {
            var workplaces = await _sqlRepository.GetAllAsync<Workplace>();
            var workplacesTableDto = _mapper.Map<List<WorkplaceTableDto>>(workplaces);
            return workplacesTableDto;
        }
    }
}
