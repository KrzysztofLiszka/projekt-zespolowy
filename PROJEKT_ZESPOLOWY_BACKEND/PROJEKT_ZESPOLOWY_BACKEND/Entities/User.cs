namespace PROJEKT_ZESPOLOWY_BACKEND.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public Guid? WorkplaceUuid { get; set; }
        public string? RoleName { get; set; } = string.Empty;
        public byte[]? ProfilePicture { get; set; }
    }
}
