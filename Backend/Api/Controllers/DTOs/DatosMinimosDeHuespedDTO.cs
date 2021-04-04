using System.ComponentModel;

namespace Api.Controllers.DTOs
{
	public class DatosMinimosDeHuespedDTO
	{
		[YKNRequired, YKNStringLength(Maximo = 70), DisplayName("Nombre completo")]
		public string NombreCompleto { get; set; }

		[YKNRequired, YKNStringLength(Minimo = 3, Maximo = 30), DisplayName("DNI o Pasaporte")]
		public string DniOPasaporte { get; set; }

		[YKNStringLength(Maximo = 35)]
		public string Telefono { get; set; }

		[YKNStringLength(Maximo = 256)]
		public string Email { get; set; }
	}
}