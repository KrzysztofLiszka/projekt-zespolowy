﻿namespace PROJEKT_ZESPOLOWY_BACKEND.DTOs
{
    public class NewAssignmentDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public Guid UserId { get; set; } = Guid.Empty;

    }
}
