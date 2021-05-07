using System;
using Api.Controllers.DTOs.Habitacion;
using Api.Core;
using AutoMapper;
using Api.Core.Entidades;

namespace Api.Controllers.Mapping
{
    public class DTOToModelProfile : Profile
    {
        public DTOToModelProfile()
        {
            CreateMap<string, DateTime>().ConvertUsing(new StringADateTimeConverter());

            CreateMap<HabitacionDTO, Habitacion>()
                .ForMember(
                    dest => dest.CamasIndividuales,
                    opt => opt.MapFrom(src => src.CamasIndividuales)
                )
                .ForMember(
                    dest => dest.CamasMatrimoniales,
                    opt => opt.MapFrom(src => src.CamasMatrimoniales)
                )
                .ForMember(
                    dest => dest.CamasCuchetas,
                    opt => opt.MapFrom(src => src.CamasCuchetas)
                );

            CreateMap<CamaDTO, CamaIndividual>();
            CreateMap<CamaDTO, CamaMatrimonial>();
            CreateMap<CamaDTO, CamaCuchetaDeAbajo>();
            CreateMap<CamaDTO, CamaCuchetaDeArriba>();

            CreateMap<CamaCuchetaDTO, CamaCucheta>()
                .ForMember(
                    dest => dest.Abajo,
                    opt => opt.MapFrom(src => src.Abajo)
                )
                .ForMember(
                    dest => dest.Arriba,
                    opt => opt.MapFrom(src => src.Arriba)
                )
                .AfterMap((dto, entity) =>
                {
                    entity.Arriba = new CamaCuchetaDeArriba {Nombre = dto.Nombre};
                    entity.Abajo = new CamaCuchetaDeAbajo {Nombre = dto.Nombre};
                });
        }

        public class StringADateTimeConverter : ITypeConverter<string, DateTime>
        {
            public DateTime Convert(string source, DateTime destination, ResolutionContext context)
            {
                return Utilidades.ConvertirFecha(source);
            }
        }
    }
}
