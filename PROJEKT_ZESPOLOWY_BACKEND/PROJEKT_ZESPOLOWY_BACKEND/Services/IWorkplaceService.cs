﻿using PROJEKT_ZESPOLOWY_BACKEND.DTOs;

namespace PROJEKT_ZESPOLOWY_BACKEND.Services
{
    public interface IWorkplaceService
    {
        Task AddNewWorkplace(NewWorkplaceDto workplace);
        Task EditWorkplace(EditWorkplaceDto workplace);
        Task JoinWorkplace();
        Task<List<WorkplaceTableDto>> GetWorkplaces();
        Task DeleteWorkplace(Guid uuid);
    }
}
