using Api.Core.Entidades;
using Api.Controllers.DTOs.Usuario;

namespace Api.Controllers.Mapping
{
	public static class UsuarioMapper
	{
		public static RegistrarDTO Map(Usuario entidad)
		{
			return new RegistrarDTO
			{
				Nombre = entidad.Nombre,
				Apellido = entidad.Apellido,
				Username = entidad.Username
			};
		}
	}
}
