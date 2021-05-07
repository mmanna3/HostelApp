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
    public class ModelToDTOProfile : Profile
    {
        public ModelToDTOProfile()
        {
            CreateMap<Huesped, HuespedDTO>();
            CreateMap<Huesped, DatosMinimosDeHuespedDTO>();

            CreateMap<Habitacion, HabitacionDTO>();

            CreateMap<Cama, CamaDTO>()
                .ForMember(
                    dest => dest.Tipo,
                    opt => opt.MapFrom(src => src.Tipo())
                );

            CreateMap<CamaIndividual, CamaDTO>()
                .ForMember(
                    dest => dest.Tipo,
                    opt => opt.MapFrom(src => "Individual")
                );

            CreateMap<CamaMatrimonial, CamaDTO>()
                .ForMember(
                    dest => dest.Tipo,
                    opt => opt.MapFrom(src => "Matrimonial")
                );

            CreateMap<CamaCuchetaDeAbajo, CamaDTO>()
                .ForMember(
                    dest => dest.Tipo,
                    opt => opt.MapFrom(src => "Cucheta Abajo")
                );

            CreateMap<CamaCuchetaDeArriba, CamaDTO>()
                .ForMember(
                    dest => dest.Tipo,
                    opt => opt.MapFrom(src => "Cucheta Arriba")
                );

            CreateMap<Habitacion, HabitacionDTO>()
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

            CreateMap<CamaCucheta, CamaCuchetaDTO>()
                .ForMember(
                    dest => dest.Abajo,
                    opt => opt.MapFrom(src => src.Abajo)
                )
                .ForMember(
                    dest => dest.Arriba,
                    opt => opt.MapFrom(src => src.Arriba)
                );

            CreateMap<Usuario, RegistrarDTO>();

            CreateMap<Habitacion, HabitacionParaReservaDTO>()
                .ForMember(
                    dest => dest.Camas,
                    opt => opt.Ignore()
                )
                .ForMember(
                    dest => dest.CantidadDeLugaresLibres,
                    opt => opt.Ignore()
                );


            CreateMap<Reserva, CheckoutsDeHoyDTO>();

            CreateMap<Reserva, ReservasDelPeriodoDTO.ReservaResumenDTO>()
	            .ForMember(
                    dest => dest.NombreAbreviadoDelHuesped,
                    opt => opt.MapFrom(src => src.ObtenerNombreAbreviadoDelHuesped())
                )
	            .ForMember(
                    dest => dest.DiaDeCheckin,
                    opt => opt.MapFrom((src, dest, _, context) => src.PrimeraNoche < ((DateTime)context.Options.Items["desde"]) ? ((DateTime)context.Options.Items["desde"]) : src.PrimeraNoche)
                )
                .ForMember(
                    dest => dest.DiaDeCheckout,
                    opt => opt.MapFrom((src, dest, _, context) => src.UltimaNoche > ((DateTime)context.Options.Items["hasta"]) ? ((DateTime)context.Options.Items["hasta"]) : src.UltimaNoche)
                )
                .ForMember(
                    dest => dest.CamasIds,
                    opt => opt.MapFrom(src => src.ReservaCamas.Select(x => x.CamaId))
                );

            CreateMap<IEnumerable<Reserva>, ReservasDelPeriodoDTO>()
                .ForMember(
                    dest => dest.Reservas,
                    opt => opt.MapFrom(src => src)
                )
                .ForMember(
                    dest => dest.Desde,
                    opt => opt.MapFrom((src, dest, _, context) => ((DateTime)context.Options.Items["desde"]))
                )
                .ForMember(
                    dest => dest.Hasta,
                    opt => opt.MapFrom((src, dest, _, context) => ((DateTime)context.Options.Items["hasta"]))
                );

            CreateMap<DateTime, string>().ConvertUsing(new DateTimeAStringConverter());
        }

        public class DateTimeAStringConverter : ITypeConverter<DateTime, string>
        {
            public string Convert(DateTime source, string destination, ResolutionContext context)
            {
                return Utilidades.ConvertirFecha(source);
            }
        }
    }
}
