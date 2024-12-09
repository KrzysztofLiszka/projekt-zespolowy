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
        private readonly ICurrentUserService _currentUserService;

        public WorkplaceService(ISqlRepository sqlRepository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _sqlRepository = sqlRepository;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task JoinWorkplace(Guid workplaceUuid)
        {
            var userId = _currentUserService.GetCurrentUserId();
            var user = await _sqlRepository.GetAsync<User>(userId);
            if (user == null) return;
            user.WorkplaceUuid = workplaceUuid;
            await _sqlRepository.UpdateAsync(user);
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
