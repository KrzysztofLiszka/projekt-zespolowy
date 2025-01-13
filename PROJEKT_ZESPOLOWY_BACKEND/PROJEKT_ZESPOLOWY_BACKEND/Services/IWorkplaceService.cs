using PROJEKT_ZESPOLOWY_BACKEND.DTOs;

namespace PROJEKT_ZESPOLOWY_BACKEND.Services
{
    public interface IWorkplaceService
    {
        Task AddNewWorkplace(NewWorkplaceDto workplace);
        Task EditWorkplace(EditWorkplaceDto workplace);
        Task<List<WorkplaceTableDto>> GetWorkplaces();
        Task DeleteWorkplace(Guid uuid);
        Task JoinWorkplace(Guid workplaceUuid);
        Task<List<CooworkerDto>> GetCooworkers();
        Task<List<CooworkerDto>> GetWorkersToAssignment();
        Task<List<SalaryDto>> GetSalaryDtosAsync(DateTime? from, DateTime? to);
    }
}
