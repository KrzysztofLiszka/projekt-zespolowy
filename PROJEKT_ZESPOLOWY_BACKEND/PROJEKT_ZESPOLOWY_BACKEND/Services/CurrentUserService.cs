using System.IdentityModel.Tokens.Jwt;

namespace PROJEKT_ZESPOLOWY_BACKEND.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid GetCurrentUserId()
        {
            var authHeader = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
            var tokenString = authHeader.FirstOrDefault()?.Split(' ').Last();

            if (tokenString != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.ReadJwtToken(tokenString);

                var userIdClaim = token.Claims.FirstOrDefault(c => c.Type == "userId");
                if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out Guid userId))
                {
                    return userId;
                }
            }

            return Guid.Parse("9cfd2ae4-158d-475a-a9d5-d82a35ebca61");
        }
    }
}
