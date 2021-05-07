using Api.Controllers.DTOs;
using Api.Core.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Api.Controllers.Mapping
{
	public static class HuespedMapper
	{
		public static DatosMinimosDeHuespedDTO MapToDatosMinimosDelHuesped(Huesped entidad)
		{
			return new DatosMinimosDeHuespedDTO
			{
				NombreCompleto = entidad.NombreCompleto,
				DniOPasaporte = entidad.DniOPasaporte,
				Pais = entidad.Pais,
				Telefono = entidad.Telefono,
				Email = entidad.Email
			};
		}

		public static HuespedDTO Map(Huesped entidad)
		{
			return new HuespedDTO
			{
				Id = entidad.Id,
				NombreCompleto = entidad.NombreCompleto,
				DniOPasaporte = entidad.DniOPasaporte,
				Pais = entidad.Pais,
				Telefono = entidad.Telefono,
				Email = entidad.Email
			};
		}

		public static IEnumerable<HuespedDTO> Map(IEnumerable<Huesped> huespedes)
		{
			return huespedes.Select(Map);
		}

		public static Huesped Map(HuespedDTO dto)
		{
			return new Huesped
			{
				NombreCompleto = dto.NombreCompleto,
				Pais = dto.Pais,
				DniOPasaporte = dto.DniOPasaporte,
				Telefono = dto.Telefono,
				Email = dto.Email,
				Id = dto.Id
			};
		}
	}
}
