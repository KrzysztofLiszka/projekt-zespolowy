namespace PROJEKT_ZESPOLOWY_BACKEND.DTOs
{
    public class UpdateExternalUserDto
    {
        public Guid Uuid { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public double HourlyRate { get; set; }
        public string RoleName { get; set; } = string.Empty;
    }
}
