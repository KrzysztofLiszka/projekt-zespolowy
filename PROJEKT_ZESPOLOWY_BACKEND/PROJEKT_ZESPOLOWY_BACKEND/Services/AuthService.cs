using Microsoft.IdentityModel.Tokens;
using PROJEKT_ZESPOLOWY_BACKEND.Data;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace PROJEKT_ZESPOLOWY_BACKEND.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public User? AuthenticateUser(LoginDto loginDto)
        {
            var authorizedUser = _context.Set<User>().AsQueryable()
                .FirstOrDefault(x => x.Email == loginDto.Email && x.PasswordHash == HashPassword(loginDto.Password));
            return authorizedUser;
        }

        public string GenerateJtwToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            var claims = new List<Claim>
            {
                new("userId", user.Uuid.ToString())
            };
            if (user.RoleName != null) claims.Add(new Claim(ClaimTypes.Role, user.RoleName));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_configuration["Jwt:TokenExpirationMins"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<User?> RegisterUser(RegisterDto registerDto)
        {
            var foundUser = _context.Set<User>().AsQueryable().FirstOrDefault(x => x.Email == registerDto.Email);
            var user = new User
            {
                Email = registerDto.Email,
                Name = registerDto.Name,
                Surname = registerDto.Surname,
                PasswordHash = HashPassword(registerDto.Password)
            };
            await _context.Set<User>().AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }
        
        private static string HashPassword(string password)
        {
            var hashedBytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));

            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }
    }
}
