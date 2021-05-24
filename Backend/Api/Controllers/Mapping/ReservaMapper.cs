using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.DTOs.Reserva;
using Api.Core;
using Api.Core.Entidades;

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
				Camas = new List<CamaDTO>()
			};

			if (entidad.ReservaHabitacionesPrivadas != null)
				dto.HabitacionesPrivadas = HabitacionMapper
					.Map(entidad.ReservaHabitacionesPrivadas.Select(x => x.HabitacionPrivada)).ToList();

			if (entidad.ReservaCamas != null)
				dto.Camas = HabitacionMapper.MapCamas(entidad.ReservaCamas.Select(x => x.Cama)).ToList();

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
				NombreAbreviadoDelHuesped = entidad.ObtenerNombreAbreviadoDelHuesped(),
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

		public static Reserva Map(ReservaCreacionDTO creacionDTO)
		{
			var reserva = new Reserva
			{
				ReservaCamas = creacionDTO.CamasIds?.Select(x => new ReservaCama { CamaId = x }).ToList(),
				ReservaHabitacionesPrivadas = creacionDTO.HabitacionesPrivadasIds?.Select(x => new ReservaHabitacionPrivada { HabitacionPrivadaId = x }).ToList(),
				PasajeroTitular = PasajeroMapper.Map(creacionDTO.PasajeroTitular),
				Estado = creacionDTO.Estado,
				Canal = creacionDTO.Canal,
				HoraEstimadaDeLlegada = TimeSpan.Parse(creacionDTO.HoraEstimadaDeLlegada),
				CantidadDePasajeros = creacionDTO.CantidadDePasajeros,
				PrimeraNoche = Utilidades.ConvertirFecha(creacionDTO.DiaDeCheckin),
				UltimaNoche = Utilidades.ConvertirFecha(creacionDTO.DiaDeCheckout).AddDays(-1),
			};

			// Seguro esto se puede hacer mejor
			foreach (var reservaCama in reserva.ReservaCamas)
			{
				reservaCama.Reserva = reserva;
			}

			return reserva;
		}
	}
}
