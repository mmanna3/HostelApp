using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.DTOs.Pasajero;
using Api.Controllers.DTOs.Reserva;
using Api.Core;
using Api.Core.Entidades;
using Api.Core.Enums;

namespace Api.Controllers.Mapping
{
	public static class ReservaMapper
	{
		public static ReservaDetalleDTO Map(Reserva entidad)
		{
			var dto = new ReservaDetalleDTO
			{
				Id = entidad.Id,
				Estado = entidad.Estado,
				HoraEstimadaDeLlegada = entidad.HoraEstimadaDeLlegada.ToString(@"hh\:mm"),
				CantidadDePasajeros = entidad.CantidadDePasajeros,
				Canal = entidad.Canal,
				DiaDeCheckout = Utilidades.ConvertirFecha(entidad.UltimaNoche.AddDays(1)),
				DiaDeCheckin = Utilidades.ConvertirFecha(entidad.PrimeraNoche),
				PasajeroTitular = PasajeroMapper.Map(entidad.PasajeroTitular),
				HabitacionesPrivadas = new List<HabitacionDTO>(),
				PasajerosAnexos = new List<PasajeroDTO>(),
				Camas = new List<CamaDTO>()
			};

			if (entidad.ReservaHabitacionesPrivadas != null)
				dto.HabitacionesPrivadas = HabitacionMapper
					.Map(entidad.ReservaHabitacionesPrivadas.Select(x => x.HabitacionPrivada)).ToList();

			if (entidad.ReservaCamas != null)
				dto.Camas = HabitacionMapper.MapCamas(entidad.ReservaCamas.Select(x => x.Cama)).ToList();

			if (entidad.ReservaPasajerosAnexos != null)
				dto.PasajerosAnexos = PasajeroMapper.Map(entidad.ReservaPasajerosAnexos.Select(x => x.Pasajero)).ToList();

			return dto;
		}

		public static ReservasDelPeriodoDTO Map(IEnumerable<Reserva> entidad, DateTime primeraNoche, DateTime ultimaNoche)
		{
			return new ReservasDelPeriodoDTO
			{
				Desde = Utilidades.ConvertirFecha(primeraNoche),
				Hasta = Utilidades.ConvertirFecha(ultimaNoche),
				Reservas = entidad.Select(x => Map(x, primeraNoche, ultimaNoche)).ToList()
			};
		}

		private static ReservaResumenDTO Map(Reserva entidad, DateTime primeraNoche, DateTime ultimaNoche)
		{
			var camasIds = new List<int>();

			if (entidad.ReservaCamas != null)
				camasIds.AddRange(entidad.ReservaCamas.Select(x => x.CamaId).ToList());

			if (entidad.ReservaHabitacionesPrivadas != null)
				foreach (var reservaHabitacionPrivada in entidad.ReservaHabitacionesPrivadas)
				{
					if (reservaHabitacionPrivada.HabitacionPrivada.CamasCuchetas != null)
					{
						camasIds.AddRange(reservaHabitacionPrivada.HabitacionPrivada.CamasCuchetas.Select(x => x.Abajo.Id));
						camasIds.AddRange(reservaHabitacionPrivada.HabitacionPrivada.CamasCuchetas.Select(x => x.Arriba.Id));
					}

					if (reservaHabitacionPrivada.HabitacionPrivada.CamasIndividuales != null)
						camasIds.AddRange(reservaHabitacionPrivada.HabitacionPrivada.CamasIndividuales.Select(c => c.Id).ToList());

					if (reservaHabitacionPrivada.HabitacionPrivada.CamasMatrimoniales != null)
						camasIds.AddRange(reservaHabitacionPrivada.HabitacionPrivada.CamasMatrimoniales.Select(c => c.Id).ToList());
				}

			return new ReservaResumenDTO
			{
				Id = entidad.Id,
				NombreAbreviadoDelPasajero = entidad.ObtenerNombreAbreviadoDelHuesped(),
				Estado = entidad.Estado,
				DiaDeCheckin = Utilidades.ConvertirFecha(entidad.PrimeraNoche < primeraNoche ? primeraNoche : entidad.PrimeraNoche), 
				DiaDeCheckout = Utilidades.ConvertirFecha(entidad.UltimaNoche > ultimaNoche ? ultimaNoche : entidad.UltimaNoche), 
				CamasIds = camasIds
			};
		}

		public static IEnumerable<CheckoutsDeHoyDTO> Map(IEnumerable<Reserva> reservas)
		{
			return reservas.Select(x => new CheckoutsDeHoyDTO {Id = x.Id});
		}

		public static Reserva Map(ReservaCreacionDTO dto)
		{
			var reserva = new Reserva
			{
				ReservaCamas = dto.CamasIds?.Select(x => new ReservaCama { CamaId = x }).ToList(),
				ReservaHabitacionesPrivadas = dto.HabitacionesPrivadasIds?.Select(x => new ReservaHabitacionPrivada { HabitacionPrivadaId = x }).ToList(),
				PasajeroTitular = PasajeroMapper.Map(dto.PasajeroTitular),
				Estado = dto.Estado,
				Canal = dto.Canal,
				HoraEstimadaDeLlegada = TimeSpan.Parse(dto.HoraEstimadaDeLlegada),
				CantidadDePasajeros = dto.CantidadDePasajeros,
				PrimeraNoche = Utilidades.ConvertirFecha(dto.DiaDeCheckin),
				UltimaNoche = Utilidades.ConvertirFecha(dto.DiaDeCheckout).AddDays(-1),
			};

			// Seguro esto se puede hacer mejor
			foreach (var reservaCama in reserva.ReservaCamas)
			{
				reservaCama.Reserva = reserva;
			}

			return reserva;
		}

		public static Reserva Map(HacerCheckInDTO dto)
		{
			var reserva = new Reserva
			{
				Id = dto.ReservaId,
				PasajeroTitular = PasajeroMapper.Map(dto.PasajeroTitular),
				Estado = ReservaEstadoEnum.InHouse,
				ReservaPasajerosAnexos = dto.PasajerosAnexos?.Select(x => new ReservaPasajeroAnexo { Pasajero = PasajeroMapper.Map(x), ReservaId = dto.ReservaId}).ToList(),
			};

			return reserva;
		}
	}
}
