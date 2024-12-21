using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.Services;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;
using System.Reflection;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ISqlRepository _sqlRepository;
        private readonly ICurrentUserService _currentUserService;

        public AuthController(IAuthService authService, ISqlRepository sqlRepository, ICurrentUserService currentUserService)
        {
            _authService = authService;
            _sqlRepository = sqlRepository;
            _currentUserService = currentUserService;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var user = _authService.AuthenticateUser(loginDto);
            if (user == null)
                return Unauthorized("Wrong login or password!");

            var jwtToken = _authService.GenerateJtwToken(user);

            byte[] profilePictureBytes;

            // Jeśli użytkownik nie ma zdjęcia profilowego (null lub pusta tablica bajtów)
            if (user.ProfilePicture == null || user.ProfilePicture.Length == 0)
            {
                // Pobierz domyślne zdjęcie profilowe
                var path = Path.Combine(Directory.GetCurrentDirectory(), "user-photo.jpg");
                if (!System.IO.File.Exists(path))
                {
                    return StatusCode(500, "Default profile picture not found!");
                }
                profilePictureBytes = await System.IO.File.ReadAllBytesAsync(path);
            }
            else
            {
                profilePictureBytes = user.ProfilePicture;
            }

            return Ok(new
            {
                token = jwtToken,
                username = user.Name + " " + user.Surname,
                picture = Convert.ToBase64String(profilePictureBytes)
            });
        }



        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            await _authService.RegisterUser(registerDto);
            return Ok(new { message = "User registered" });
        }

        [Authorize]
        [HttpGet("all-users")]
        public async Task<ActionResult> GetUsers()
        {
            var result = await _sqlRepository.GetAllAsync<User>();
            return Ok(result);
        }

        [Authorize]
        [HttpPost("UpdateUserProfilePicture")]
        public async Task<IActionResult> UpdateUserProfilePicture()
        {
            var file = Request.Form.Files[0];
            var userId = _currentUserService.GetCurrentUserId();
            var user = await _sqlRepository.GetAsync<User>(userId);
            if (user == null)
            {
                return NotFound("User with this Id was not found!");
            }
            user.ProfilePicture = ConvertFileToByte(file);
            await _sqlRepository.UpdateAsync(user);
            return Ok();
        }

        private static byte[] ConvertFileToByte(IFormFile file)
        {
            using var ms = new MemoryStream();
            file.CopyTo(ms);
            var fileBytes = ms.ToArray();

            return fileBytes;
        }
    }
}
