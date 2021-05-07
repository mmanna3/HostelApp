using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.DTOs.Usuario;
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


            CreateMap<HuespedDTO, Huesped>();

            CreateMap<DatosMinimosDeHuespedDTO, Huesped>();

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

            CreateMap<ReservaDTO, Reserva>()
                .ForMember(
                    m => m.ReservaCamas,
                    dto => dto.MapFrom(x => UnificarCamasIds(x))
                )
                .ForMember(
	                m => m.Huesped,
	                dto => dto.MapFrom(x => x.DatosMinimosDeHuesped)
                )
                .ForMember(
	                m => m.PrimeraNoche,
	                dto => dto.MapFrom(x => x.DiaDeCheckin)
                )
                .ForMember(
	                m => m.UltimaNoche,
	                dto => dto.MapFrom(x => x.DiaDeCheckout)
                )
                .AfterMap((model, entity) =>
                {
                    foreach (var reservaCama in entity.ReservaCamas)
                    {
                        reservaCama.Reserva = entity;
                    }

                    entity.UltimaNoche = entity.UltimaNoche.AddDays(-1);
                });


            CreateMap<int, ReservaCama>()
                .ForMember(
                    m => m.CamaId,
                    dto => dto.MapFrom(x => x)
                );
        }

        private static List<int> UnificarCamasIds(ReservaDTO dto)
        {
            var resultado = new List<int>();
            if (dto.CamasIds != null)
                resultado.AddRange(dto.CamasIds.Where(c => c != null).Select(x => (int)x).ToList());

            if (dto.CamasDeHabitacionesPrivadasIds != null)
                foreach (var idsDeCamasDeUnaHabitacionPrivada in dto.CamasDeHabitacionesPrivadasIds)
                    if (idsDeCamasDeUnaHabitacionPrivada != null)
                        resultado.AddRange(idsDeCamasDeUnaHabitacionPrivada);

            return resultado;
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
