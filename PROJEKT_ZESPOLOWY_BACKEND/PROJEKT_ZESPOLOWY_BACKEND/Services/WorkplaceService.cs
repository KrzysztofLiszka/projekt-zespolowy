using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PROJEKT_ZESPOLOWY_BACKEND.Constants;
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
            user.RoleName = Roles.Worker;
            user.WorkplaceUuid = workplaceUuid;
            await _sqlRepository.UpdateAsync(user);
        }

        public async Task AddNewWorkplace(NewWorkplaceDto workplace)
        {
            var newWorkplace = new Workplace
            {
                Name = workplace.Name
            };
            var userId = _currentUserService.GetCurrentUserId();
            var user = await _sqlRepository.GetAsync<User>(userId);
            if (user == null) return;
            user.RoleName = Roles.WorkspaceOwner;
            await _sqlRepository.AddAsync(newWorkplace);
            user.WorkplaceUuid = newWorkplace.Uuid;
            await _sqlRepository.UpdateAsync(user);
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
            var workplaces = await _sqlRepository.GetQueryable<Workplace>().ToListAsync();
            var workplacesTableDto = _mapper.Map<List<WorkplaceTableDto>>(workplaces);
            return workplacesTableDto;
        }

        public async Task<List<CooworkerDto>> GetCooworkers()
        {
            var userId = _currentUserService.GetCurrentUserId();
            var user = await _sqlRepository.GetAsync<User>(userId) ?? throw new Exception("User not found!");
            var workersFromWorkplace = await _sqlRepository.GetQueryable<User>().Where(x => x.WorkplaceUuid == user.WorkplaceUuid && x.Uuid != user.Uuid).ToListAsync();
            return _mapper.Map<List<CooworkerDto>>(workersFromWorkplace);
        }

        public async Task<List<CooworkerDto>> GetWorkersToAssignment()
        {
            var userId = _currentUserService.GetCurrentUserId();
            var user = await _sqlRepository.GetAsync<User>(userId) ?? throw new Exception("User not found!");
            var workersFromWorkplace = await _sqlRepository.GetQueryable<User>().Where(x => x.WorkplaceUuid == user.WorkplaceUuid).ToListAsync();
            return _mapper.Map<List<CooworkerDto>>(workersFromWorkplace);
        }

        public async Task<List<SalaryDto>> GetSalaryDtosAsync(DateTime? from, DateTime? to)
        {
            // Ensure 'from' and 'to' are in UTC and properly formatted
            if (from.HasValue)
                from = from.Value.Kind == DateTimeKind.Unspecified
                    ? DateTime.SpecifyKind(from.Value, DateTimeKind.Utc)
                    : from.Value.ToUniversalTime();

            if (to.HasValue)
                to = to.Value.Kind == DateTimeKind.Unspecified
                    ? DateTime.SpecifyKind(to.Value, DateTimeKind.Utc)
                    : to.Value.ToUniversalTime();

            var userId = _currentUserService.GetCurrentUserId();
            var user = await _sqlRepository.GetAsync<User>(userId) ?? throw new Exception("User not found!");
            var workersFromWorkplace = await _sqlRepository.GetQueryable<User>()
                .Where(x => x.WorkplaceUuid == user.WorkplaceUuid && x.Uuid != user.Uuid)
                .ToListAsync();

            var result = new List<SalaryDto>();

            foreach (var worker in workersFromWorkplace)
            {
                // Get queryable data for time spent
                var timeSpentsQuery = _sqlRepository.GetQueryable<TimeSpent>()
                    .Where(x => x.CreatedBy == worker.Uuid);

                // Apply filters only if both 'from' and 'to' are provided
                if (from.HasValue && to.HasValue)
                {
                    timeSpentsQuery = timeSpentsQuery
                        .Where(x => x.CreatedAt >= from && x.CreatedAt <= to);
                }

                // Fetch data and calculate salary
                var timeSpents = await timeSpentsQuery.ToListAsync();
                var totalHours = timeSpents.Sum(x => x.SpentHours);

                result.Add(new SalaryDto
                {
                    FullName = $"{worker.Name} {worker.Surname}",
                    Amount = totalHours * worker.HourlyRate
                });
            }

            return result;
        }

    }
}
