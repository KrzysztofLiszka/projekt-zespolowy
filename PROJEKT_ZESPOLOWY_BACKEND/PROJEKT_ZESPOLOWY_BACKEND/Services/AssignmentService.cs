using AutoMapper;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;

namespace PROJEKT_ZESPOLOWY_BACKEND.Services
{
    public class AssignmentService : IAssignmentService
    {
        private readonly ISqlRepository _sqlRepository;
        private readonly IMapper _mapper;

        public AssignmentService(ISqlRepository sqlRepository, IMapper mapper)
        {
            _sqlRepository = sqlRepository;
            _mapper = mapper;
        }

        public async Task AddNewAssignment(NewAssignmentDto assignment)
        {
            var newAssignment = new Assignment
            {
                Name = assignment.Name,
                Description = assignment.Description,
                Status = assignment.Status
            };
            await _sqlRepository.AddAsync(newAssignment);
        }

        public async Task DeleteAssignment(Guid uuid)
        {
            await _sqlRepository.DeleteAsync<Assignment>(uuid);
        }

        public async Task EditAssignment(EditAssignmentDto assignment)
        {
            var editAssignment = await _sqlRepository.GetAsync<Assignment>(assignment.Uuid);
            if (editAssignment == null) return;
            editAssignment.Name = assignment.Name;
            editAssignment.Description = assignment.Description;
            editAssignment.Status = assignment.Status;
            await _sqlRepository.UpdateAsync(editAssignment);
        }

        public async Task<List<AssignmentTableDto>> GetAssignments()
        {
            var assignments = await _sqlRepository.GetAllAsync<Assignment>();
            var assignmentsTable = _mapper.Map<List<AssignmentTableDto>>(assignments);
            return assignmentsTable;
        }
    }
}
