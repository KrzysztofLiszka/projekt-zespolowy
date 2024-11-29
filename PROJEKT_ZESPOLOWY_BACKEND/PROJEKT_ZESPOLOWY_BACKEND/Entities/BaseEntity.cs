namespace PROJEKT_ZESPOLOWY_BACKEND.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public Guid Uuid { get; set; } = Guid.NewGuid();
        public Guid CreatedBy { get; set; } = Guid.NewGuid();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedAt { get; set; }
    }
}
