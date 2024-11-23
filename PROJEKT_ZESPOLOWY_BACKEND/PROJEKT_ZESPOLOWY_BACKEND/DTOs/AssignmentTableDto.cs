namespace PROJEKT_ZESPOLOWY_BACKEND.DTOs
{
    public class AssignmentTableDto
    {
        public Guid Uuid { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
