using System.Collections.Generic;

namespace Api.Controllers.DTOs.Habitacion
{
    public class HabitacionDetalleDTO : HabitacionBaseDTO
    {
        public List<CamaDTO> Camas { get; set; }
	}
}
