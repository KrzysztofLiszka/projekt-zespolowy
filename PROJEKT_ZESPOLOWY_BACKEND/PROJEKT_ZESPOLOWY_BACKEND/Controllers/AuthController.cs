﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.Services;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ISqlRepository _sqlRepository;

        public AuthController(IAuthService authService, ISqlRepository sqlRepository)
        {
            _authService = authService;
            _sqlRepository = sqlRepository;
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

        [Authorize]
        [HttpGet("all-users")]
        public async Task<ActionResult> GetUsers()
        {
            var result = await _sqlRepository.GetAllAsync<User>();
            return Ok(result);
        }
    }
}
