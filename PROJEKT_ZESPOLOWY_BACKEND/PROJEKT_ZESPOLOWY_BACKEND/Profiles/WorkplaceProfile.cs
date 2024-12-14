using AutoMapper;
using PROJEKT_ZESPOLOWY_BACKEND.DTOs;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;

namespace PROJEKT_ZESPOLOWY_BACKEND.Profiles
{
    public class WorkplaceProfile : Profile
    {
        public WorkplaceProfile()
        {
            CreateMap<Workplace, WorkplaceTableDto>();
            CreateMap<User, CooworkerDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.Name + " " + src.Surname));

        }
    }
}
