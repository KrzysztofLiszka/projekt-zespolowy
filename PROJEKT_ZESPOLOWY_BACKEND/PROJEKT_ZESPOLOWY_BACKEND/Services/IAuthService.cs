using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;

namespace PROJEKT_ZESPOLOWY_BACKEND.Services
{
    public interface IAuthService
    {
        User? AuthenticateUser(LoginDto loginDto);
        Task<User?> RegisterUser(RegisterDto registerDto);
        string GenerateJtwToken(User user);
    }
}
