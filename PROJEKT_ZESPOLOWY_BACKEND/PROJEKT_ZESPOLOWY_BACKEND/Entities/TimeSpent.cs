namespace PROJEKT_ZESPOLOWY_BACKEND.Entities
{
    public class TimeSpent : BaseEntity
    {
        public uint SpentHours { get; set; }
        public DateTime Date { get; set; }
    }
}
