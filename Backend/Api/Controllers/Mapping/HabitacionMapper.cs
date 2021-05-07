using Api.Controllers.DTOs;
using Api.Core.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers.DTOs.Habitacion;

namespace Api.Controllers.Mapping
{
	public static class HabitacionMapper
	{
		public static HabitacionDTO Map(Habitacion entidad)
		{
			return new HabitacionDTO
			{
				Id = entidad.Id,
				Nombre = entidad.Nombre,
				TieneBanio = entidad.TieneBanio,
				EsPrivada = entidad.EsPrivada,
				InformacionAdicional = entidad.InformacionAdicional,
				CamasIndividuales = entidad.CamasIndividuales.Select(entidadCamasIndividuale => new CamaDTO
				{
					Id = entidadCamasIndividuale.Id,
					Nombre = entidadCamasIndividuale.Nombre,
					Tipo = entidadCamasIndividuale.Tipo()
				}).ToList(),
				CamasCuchetas = entidad.CamasCuchetas.Select(entidadCamasCucheta => new CamaCuchetaDTO
				{
					Id = entidadCamasCucheta.Id,
					Abajo = new CamaDTO
					{
						Id = entidadCamasCucheta.Abajo.Id,
						Nombre = entidadCamasCucheta.Abajo.Nombre,
						Tipo = entidadCamasCucheta.Abajo.Tipo()
					},
					Arriba = new CamaDTO
					{
						Id = entidadCamasCucheta.Arriba.Id,
						Nombre = entidadCamasCucheta.Arriba.Nombre,
						Tipo = entidadCamasCucheta.Arriba.Tipo()
					}
				}).ToList(),
				CamasMatrimoniales = entidad.CamasMatrimoniales.Select(entidadCamasMatrimoniale => new CamaDTO
				{
					Id = entidadCamasMatrimoniale.Id,
					Nombre = entidadCamasMatrimoniale.Nombre,
					Tipo = entidadCamasMatrimoniale.Tipo()
				}).ToList()
			};
		}

		public static HabitacionParaReservaDTO MapHabitacionParaReservaDTO(Habitacion habitacion, DateTime desde, DateTime hasta)
		{
			var camas = new List<Cama>();
			camas.AddRange(habitacion.CamasCuchetas.Select(x => x.Abajo).Where(x => x.EstaLibreEntre(desde, hasta)));
			camas.AddRange(habitacion.CamasCuchetas.Select(x => x.Arriba).Where(x => x.EstaLibreEntre(desde, hasta)));
			camas.AddRange(habitacion.CamasMatrimoniales.Where(x => x.EstaLibreEntre(desde, hasta)));
			camas.AddRange(habitacion.CamasIndividuales.Where(x => x.EstaLibreEntre(desde, hasta)));

			return new HabitacionParaReservaDTO
			{
				Id = habitacion.Id,
				Nombre = habitacion.Nombre,
				EsPrivada = habitacion.EsPrivada,
				CantidadDeLugaresLibres = habitacion.LugaresLibresEntre(desde, hasta),
				Camas = camas.Select(x => new CamaDTO{ Id = x.Id, Nombre = x.Nombre, Tipo = x.Tipo() }).ToList()
			};
		}

		public static IEnumerable<HabitacionParaReservaDTO> MapHabitacionParaReservaDTO(IEnumerable<Habitacion> habitaciones, DateTime desde, DateTime hasta)
		{
			return habitaciones.Select(x => MapHabitacionParaReservaDTO(x, desde, hasta)).OrderByDescending(x => x.CantidadDeLugaresLibres);
		}

		public static IEnumerable<HabitacionDTO> Map(IEnumerable<Habitacion> habitaciones)
		{
			return habitaciones.Select(Map);
		}
	}
}
