namespace PROJEKT_ZESPOLOWY_BACKEND.Entities
{
    public class Documentation : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string DescriptionHtmlContent { get; set; } = string.Empty;
    }
}
