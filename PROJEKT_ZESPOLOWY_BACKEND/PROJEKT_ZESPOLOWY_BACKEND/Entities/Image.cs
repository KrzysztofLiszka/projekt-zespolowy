namespace PROJEKT_ZESPOLOWY_BACKEND.Entities
{
    public class Image : BaseEntity
    {
        public byte[] Data { get; set; }
        public Guid VisualizationId { get; set; }
    }
}
