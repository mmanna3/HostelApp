﻿using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers.DTOs.Reserva;
using Api.Core;
using Api.Core.Entidades;

namespace Api.Controllers.Mapping
{
	public static class ReservaMapper
	{
		public static ReservaDTO Map(Reserva entidad)
		{
			return new ReservaDTO
			{
				Id = entidad.Id,
				Estado = entidad.Estado,
				HoraEstimadaDeLlegada = entidad.HoraEstimadaDeLlegada.ToString(),
				CantidadDePasajeros = entidad.CantidadDePasajeros,
				DiaDeCheckout = Utilidades.ConvertirFecha(entidad.UltimaNoche.AddDays(1)),
				DiaDeCheckin = Utilidades.ConvertirFecha(entidad.PrimeraNoche),
				CamasIds = entidad.ReservaCamas.Select(x => x.CamaId).ToList(), //Faltan las camas de las habitacionesPrivadas
				DatosMinimosDeHuesped = HuespedMapper.MapToDatosMinimosDelHuesped(entidad.Huesped)
			};
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

			camasIds.AddRange(entidad.ReservaCamas.Select(x => x.CamaId).ToList());

			if (entidad.ReservaHabitacionesPrivadas != null)
				foreach (var reservaHabitacionPrivada in entidad.ReservaHabitacionesPrivadas)
				{
					camasIds.AddRange(reservaHabitacionPrivada.HabitacionPrivada.CamasCuchetas.Select(c => c.Id).ToList());
					camasIds.AddRange(reservaHabitacionPrivada.HabitacionPrivada.CamasIndividuales.Select(c => c.Id).ToList());
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

		public static Reserva Map(ReservaDTO dto)
		{
			var reserva = new Reserva
			{
				ReservaCamas = dto.CamasIds?.Select(x => new ReservaCama { CamaId = x }).ToList(),
				ReservaHabitacionesPrivadas = dto.HabitacionesPrivadasIds?.Select(x => new ReservaHabitacionPrivada { HabitacionPrivadaId = x }).ToList(),
				Huesped = HuespedMapper.Map(dto.DatosMinimosDeHuesped),
				Estado = dto.Estado,
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
	}
}
