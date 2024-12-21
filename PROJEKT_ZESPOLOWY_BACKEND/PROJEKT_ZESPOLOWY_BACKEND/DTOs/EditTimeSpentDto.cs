namespace PROJEKT_ZESPOLOWY_BACKEND.DTOs
{
    public class EditTimeSpentDto
    {
        public Guid Uuid { get; set; }
        public uint SpentHours { get; set; }
        public DateTime Date { get; set; }
    }
}
