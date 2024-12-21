namespace PROJEKT_ZESPOLOWY_BACKEND.DTOs
{
    public class EditDocumentationDto
    {
        public Guid Uuid { get; set; }
        public string Name { get; set; } = string.Empty;
        public string DescriptionHtmlContent { get; set; } = string.Empty;
    }
}
