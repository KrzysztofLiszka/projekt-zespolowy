using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PROJEKT_ZESPOLOWY_BACKEND.Constants;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.Services;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;
using System;
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
        private readonly IMapper _mapper;

        public AuthController(IAuthService authService, ISqlRepository sqlRepository, ICurrentUserService currentUserService, IMapper mapper)
        {
            _authService = authService;
            _sqlRepository = sqlRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var user = _authService.AuthenticateUser(loginDto);
            if (user == null)
                return Unauthorized("Wrong login or password!");

            var jwtToken = _authService.GenerateJtwToken(user);

            byte[] profilePictureBytes;

            if (user.ProfilePicture == null || user.ProfilePicture.Length == 0)
            {
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
            var base64ProfilePicture = Convert.ToBase64String(profilePictureBytes);
            return Ok(new
            {
                token = jwtToken,
                username = user.Name + " " + user.Surname,
                picture = $"data:image/jpg;base64,{base64ProfilePicture}",
                rolename = user.RoleName
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            await _authService.RegisterUser(registerDto);
            return Ok(new { message = "User registered" });
        }

        [Authorize(Roles = $"{Roles.SystemAdmin}, {Roles.WorkspaceOwner}")]
        [HttpGet("all-users")]
        public async Task<ActionResult> GetUsers()
        {
            var currentUserId = _currentUserService.GetCurrentUserId();
            var currentUser = await _sqlRepository.GetAsync<User>(currentUserId);
            if (currentUser == null)
            {
                return NotFound("User (current) with this Id was not found!");
            }
            if (currentUser.RoleName == Roles.SystemAdmin)
            {
                var result = await _sqlRepository.GetAllAsync<User>();
                return Ok(result);

            }
            else if (currentUser.RoleName == Roles.WorkspaceOwner)
            {
                var result = await _sqlRepository.GetQueryable<User>().Where(x => x.WorkplaceUuid == currentUser.WorkplaceUuid).ToListAsync();
                return Ok(result);
            }
            return Unauthorized();
        }

        [Authorize(Roles = $"{Roles.SystemAdmin}, {Roles.WorkspaceOwner}")]
        [HttpDelete("{uuid:guid}")]
        public async Task<ActionResult> DeleteUser(Guid uuid)
        {
            var currentUserId = _currentUserService.GetCurrentUserId();
            var currentUser = await _sqlRepository.GetAsync<User>(currentUserId);
            if (currentUser == null)
            {
                return NotFound("User (current) with this Id was not found!");
            }
            if (currentUser.RoleName == Roles.SystemAdmin)
            {
                await _sqlRepository.DeleteAsync<User>(uuid);
                return Ok("User deleted from system!");

            }
            else if (currentUser.RoleName == Roles.WorkspaceOwner)
            {
                var userToUpdate = await _sqlRepository.GetAsync<User>(uuid);
                if(userToUpdate == null) return NotFound("User (to update) with this Id was not found!");
                userToUpdate.WorkplaceUuid = null;
                await _sqlRepository.UpdateAsync(userToUpdate);
            }
            return Unauthorized();
        }

        [HttpPost("UpdateExternalUser")]
        [Authorize(Roles = $"{Roles.SystemAdmin}, {Roles.WorkspaceOwner}")]
        public async Task<IActionResult> UpdateUser(UpdateExternalUserDto updatedUser)
        {
            var user = await _sqlRepository.GetAsync<User>(updatedUser.Uuid);
            if (user == null) return NotFound("User (to update) with this Id was not found!");
            user.Email = updatedUser.Email;
            user.Surname = updatedUser.Surname;
            user.Name = updatedUser.Name;
            user.HourlyRate = updatedUser.HourlyRate;
            user.RoleName = updatedUser.RoleName;
            await _sqlRepository.UpdateAsync(user);
            return Ok();
        }

        [Authorize(Roles = $"{Roles.SystemAdmin}, {Roles.Worker}, {Roles.WorkspaceOwner}, {Roles.Accountant}")]
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

        [HttpPost("UpdateUser")]
        [Authorize(Roles = $"{Roles.SystemAdmin}, {Roles.Worker}, {Roles.WorkspaceOwner}, {Roles.Accountant}")]
        public async Task<IActionResult> UpdateUser(UpdateUserDto updatedUser)
        {
            var userId = _currentUserService.GetCurrentUserId();
            var user = await _sqlRepository.GetAsync<User>(userId);
            user.Name = updatedUser.Name;
            user.Surname = updatedUser.Surname;
            user.Email = updatedUser.Email;
            user.ProfilePicture = updatedUser.ProfilePicture;
            if (user == null)
            {
                return NotFound("User with this Id was not found!");
            }
            await _sqlRepository.UpdateAsync(user);
            return Ok();
        }

        [HttpPost("UpdateUserRole")]
        [Authorize(Roles = $"{Roles.SystemAdmin}, {Roles.WorkspaceOwner}")]
        public async Task<IActionResult> UpdateUser(string newUserRole, Guid userId)
        {
            var user = await _sqlRepository.GetAsync<User>(userId);
            if (user == null)
            {
                return NotFound("User with this Id was not found!");
            }
            user.RoleName = newUserRole;
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

        [Authorize(Roles = $"{Roles.SystemAdmin}, {Roles.Worker}, {Roles.WorkspaceOwner}, {Roles.Accountant}")]
        [HttpGet("current-user")]
        public async Task<ActionResult> GetCurrentUser()
        {
            var userId = _currentUserService.GetCurrentUserId();

            var user = await _sqlRepository.GetAsync<User>(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var userDto = new UpdateUserDto
            {
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                ProfilePicture=user.ProfilePicture,
            };

            return Ok(userDto);
        }

        [AllowAnonymous]
        [HttpGet("CheckIfIsInWorkplace")]
        public async Task<ActionResult<bool>> CheckIfIsInWorkplace()
        {
            var userId = _currentUserService.GetCurrentUserId();

            var user = await _sqlRepository.GetAsync<User>(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var isInWorkplace = user.WorkplaceUuid != null;

            return Ok(isInWorkplace);
        }

        [AllowAnonymous]
        [HttpGet("GetUserProfilePicture/{userId}")]
        public async Task<IActionResult> GetUserProfilePicture(string userId)
        {
            var user = await _sqlRepository.GetAsync<User>(Guid.Parse(userId));
            ImageDto image = new ImageDto();
            if (user!=null)
            {
                image.Data = user.ProfilePicture;
            }
            return Ok(image);
        }
    }
}
