using Api.Controllers.DTOs;
using Api.Core.Entidades;

namespace Api.Controllers.Mapping
{
	public static class HuespedMapper
	{
		public static DatosMinimosDeHuespedDTO Map(Huesped entidad)
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
	}
}
