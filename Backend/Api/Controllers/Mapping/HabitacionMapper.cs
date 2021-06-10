using Api.Core.Entidades;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers.DTOs.Habitacion;
using Api.Core.Enums;

namespace Api.Controllers.Mapping
{
	public static class HabitacionMapper
	{
		public static void MapBase(Habitacion entidad, HabitacionBaseDTO dto)
		{
			dto.Id = entidad.Id;
			dto.Nombre = entidad.Nombre;
			dto.TieneBanio = entidad.TieneBanio;
			dto.EsPrivada = entidad.Tipo().Equals(HabitacionTipoEnum.Privada);
			dto.EstaHabilitada = entidad.EstaHabilitada;
			dto.InformacionAdicional = entidad.InformacionAdicional;
		}

		public static HabitacionDetalleDTO MapDetalle(Habitacion habitacion)
		{
			var dto = new HabitacionDetalleDTO();
			MapBase(habitacion, dto);
			dto.Camas = habitacion.ObtenerTodasLasCamas().Select(x => new CamaDTO { Id = x.Id, Nombre = x.Nombre, Tipo = x.Tipo() }).ToList();
			return dto;			
		}

		public static HabitacionDTO Map(Habitacion entidad)
		{
			var dto = new HabitacionDTO();
			
			MapBase(entidad, dto);

			dto.CamasIndividuales = entidad.CamasIndividuales.Select(entidadCamasIndividuale => new CamaDTO
			{
				Id = entidadCamasIndividuale.Id,
				Nombre = entidadCamasIndividuale.Nombre,
				Tipo = entidadCamasIndividuale.Tipo()
			}).ToList();

			dto.CamasCuchetas = entidad.CamasCuchetas.Select(entidadCamasCucheta => new CamaCuchetaDTO
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
			}).ToList();
			
			dto.CamasMatrimoniales = entidad.CamasMatrimoniales.Select(entidadCamasMatrimoniale => new CamaDTO
			{
				Id = entidadCamasMatrimoniale.Id,
				Nombre = entidadCamasMatrimoniale.Nombre,
				Tipo = entidadCamasMatrimoniale.Tipo()
			}).ToList();

			return dto;
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

		public static IEnumerable<HabitacionDTO> Map(IEnumerable<Habitacion> habitaciones)
		{
			return habitaciones.Select(Map);
		}

		public static HabitacionConLugaresLibresDTO MapHabitacionesConLugaresLugares(Habitacion habitacion)
		{
			return new HabitacionConLugaresLibresDTO
			{
				Id = habitacion.Id,
				Nombre = habitacion.Nombre,
				CantidadDeLugaresLibres = habitacion.CantidadTotalDeLugaresDisponibles(),
				EsPrivada = habitacion.Tipo().Equals(HabitacionTipoEnum.Privada),
				Camas = habitacion.ObtenerTodasLasCamas().Select(x => new CamaDTO { Id = x.Id, Nombre = x.Nombre, Tipo = x.Tipo() }).ToList()
			};
		}

		public static IEnumerable<HabitacionConLugaresLibresDTO> MapHabitacionesConLugaresLugares(IEnumerable<Habitacion> habitaciones)
		{
			return habitaciones.Select(MapHabitacionesConLugaresLugares);
		}
	}
}
