namespace PROJEKT_ZESPOLOWY_BACKEND.DTOs
{
    public class UserTableDto
    {
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public string? RoleName { get; set; }
        public double HourlyRate { get; set; } = 0.0;
    }
}
