using PROJEKT_ZESPOLOWY_BACKEND.DTOs;

namespace PROJEKT_ZESPOLOWY_BACKEND.Services
{
    public interface IAssignmentService
    {
        Task AddNewAssignment(NewAssignmentDto assignment);
        Task EditAssignment(EditAssignmentDto assignment);
        Task<List<AssignmentTableDto>> GetAssignments();
        Task DeleteAssignment(Guid uuid);
    }
}
