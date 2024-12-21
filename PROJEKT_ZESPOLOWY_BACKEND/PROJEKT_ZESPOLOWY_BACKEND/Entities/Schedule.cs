namespace PROJEKT_ZESPOLOWY_BACKEND.Entities
{
    public class Schedule : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Hour { get; set; } = string.Empty;
    }
}
