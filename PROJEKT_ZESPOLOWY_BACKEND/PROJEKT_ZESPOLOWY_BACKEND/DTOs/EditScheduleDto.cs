namespace PROJEKT_ZESPOLOWY_BACKEND.DTOs
{
    public class EditScheduleDto
    {
        public Guid Uuid { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Hour { get; set; } = string.Empty;
    }
}
