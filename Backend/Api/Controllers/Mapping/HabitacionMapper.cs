using Api.Core.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers.DTOs.Habitacion;
using Api.Core.Enums;

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
				EsPrivada = entidad.Tipo().Equals(HabitacionTipoEnum.Privada),
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

		public static CamaDTO MapCama(Cama cama)
		{
			return new CamaDTO
			{
				Id = cama.Id,
				Tipo = cama.Tipo(),
				Nombre = cama.Nombre,
				NombreHabitacion = cama.ObtenerHabitacion().Nombre,
		};
		}

		public static HabitacionConLugaresLibresDTO MapHabitacionConLugaresLibres(Habitacion habitacion, DateTime desde, DateTime hasta)
		{
			var camas = new List<Cama>();
			if (habitacion.Tipo().Equals(HabitacionTipoEnum.Compartida))
			{
				camas.AddRange(habitacion.CamasCuchetas.Select(x => x.Abajo).Where(x => x.EstaLibreEntre(desde, hasta)));
				camas.AddRange(habitacion.CamasCuchetas.Select(x => x.Arriba).Where(x => x.EstaLibreEntre(desde, hasta)));
				camas.AddRange(habitacion.CamasMatrimoniales.Where(x => x.EstaLibreEntre(desde, hasta)));
				camas.AddRange(habitacion.CamasIndividuales.Where(x => x.EstaLibreEntre(desde, hasta)));
			}

			return new HabitacionConLugaresLibresDTO
			{
				Id = habitacion.Id,
				Nombre = habitacion.Nombre,
				CantidadDeLugaresLibres = habitacion.LugaresLibresEntre(desde, hasta),
				EsPrivada = habitacion.Tipo().Equals(HabitacionTipoEnum.Privada),
				Camas = camas.Select(x => new CamaDTO{ Id = x.Id, Nombre = x.Nombre, Tipo = x.Tipo() }).ToList()
			};
		}

		public static Habitacion Map(HabitacionDTO dto)
		{
			if (dto.EsPrivada)
				return new HabitacionPrivada
				{
					Nombre = dto.Nombre,
					TieneBanio = dto.TieneBanio,
					InformacionAdicional = dto.InformacionAdicional,
					CamasIndividuales = dto.CamasIndividuales?.ConvertAll(camaIndividual => new CamaIndividual
					{
						Nombre = camaIndividual.Nombre
					}),
					CamasMatrimoniales = dto.CamasMatrimoniales?.ConvertAll(camaMatrimonial => new CamaMatrimonial
					{
						Nombre = camaMatrimonial.Nombre
					}),
					CamasCuchetas = dto.CamasCuchetas?.ConvertAll(dtoCamasCucheta => new CamaCucheta
					{
						Abajo = new CamaCuchetaDeAbajo
						{
							Nombre = dtoCamasCucheta.Nombre
						},
						Arriba = new CamaCuchetaDeArriba
						{
							Nombre = dtoCamasCucheta.Nombre
						}
					}),
				};
			else 
				return new HabitacionCompartida
				{
					Nombre = dto.Nombre,
					TieneBanio = dto.TieneBanio,
					InformacionAdicional = dto.InformacionAdicional,
					CamasIndividuales = dto.CamasIndividuales?.ConvertAll(camaIndividual => new CamaIndividual
					{
						Nombre = camaIndividual.Nombre
					}),
					CamasMatrimoniales = dto.CamasMatrimoniales?.ConvertAll(camaMatrimonial => new CamaMatrimonial
					{
						Nombre = camaMatrimonial.Nombre
					}),
					CamasCuchetas = dto.CamasCuchetas?.ConvertAll(dtoCamasCucheta => new CamaCucheta
					{
						Abajo = new CamaCuchetaDeAbajo
						{
							Nombre = dtoCamasCucheta.Nombre
						},
						Arriba = new CamaCuchetaDeArriba
						{
							Nombre = dtoCamasCucheta.Nombre
						}
					}),
				};
		}

		public static IEnumerable<CamaDTO> MapCamas(IEnumerable<Cama> camas)
		{
			return camas.Select(MapCama);
		}

		public static IEnumerable<HabitacionConLugaresLibresDTO> MapHabitacionParaReservaDTO(IEnumerable<Habitacion> habitaciones, DateTime desde, DateTime hasta)
		{
			return habitaciones.Select(x => MapHabitacionConLugaresLibres(x, desde, hasta)).OrderByDescending(x => x.CantidadDeLugaresLibres);
		}

		public static IEnumerable<HabitacionDTO> Map(IEnumerable<Habitacion> habitaciones)
		{
			return habitaciones.Select(Map);
		}
	}
}
