using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Services;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var user = _authService.AuthenticateUser(loginDto);
            if (user == null) return Unauthorized("Wrong login or password!");
            var jwtToken = _authService.GenerateJtwToken(user);

            return Ok(new { token = jwtToken, username = user.Name + " " + user.Surname });
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            await _authService.RegisterUser(registerDto);
            return Ok(new { message = "User registered" });
        }
    }
}
