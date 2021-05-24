using Api.Controllers.DTOs.Pasajero;
using Api.Core.Entidades;
using System.Collections.Generic;
using System.Linq;

namespace Api.Controllers.Mapping
{
	public static class PasajeroMapper
	{
		public static PasajeroDTO Map(Pasajero entidad)
		{
			return new PasajeroDTO
			{
				Id = entidad.Id,
				NombreCompleto = entidad.NombreCompleto,
				DniOPasaporte = entidad.DniOPasaporte,
				Pais = entidad.Pais,
				Telefono = entidad.Telefono,
				Email = entidad.Email
			};
		}

		public static IEnumerable<PasajeroDTO> Map(IEnumerable<Pasajero> pasajeros)
		{
			return pasajeros.Select(Map);
		}

		public static Pasajero Map(PasajeroDTO dto)
		{
			return new Pasajero
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
