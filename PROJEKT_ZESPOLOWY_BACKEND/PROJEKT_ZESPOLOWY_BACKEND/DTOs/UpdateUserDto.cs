namespace PROJEKT_ZESPOLOWY_BACKEND.DTOs
{
    public class UpdateUserDto
    {
        public string? Email { get; set; } = string.Empty;
        public string? Name { get; set; } = string.Empty;
        public string? Surname { get; set; } = string.Empty;
        public byte[]? ProfilePicture { get; set; }
    }
}
