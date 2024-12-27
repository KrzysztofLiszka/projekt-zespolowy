using AutoMapper;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;

namespace PROJEKT_ZESPOLOWY_BACKEND.Profiles
{
    public class AssignmentProfile : Profile
    {
        public AssignmentProfile() 
        {
            CreateMap<Assignment, AssignmentTableDto>();
            CreateMap<Image, ImageDto>();
            CreateMap<ImageDto, Image>();
        }
    }
}
