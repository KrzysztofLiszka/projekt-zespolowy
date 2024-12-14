namespace PROJEKT_ZESPOLOWY_BACKEND.DTOs
{
    public class CooworkerDto
    {
        public Guid Uuid { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
    }
}
