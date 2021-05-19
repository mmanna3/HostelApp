using System.Collections.Generic;
using Api.Controllers.DTOs.Habitacion;

namespace Api.Controllers.DTOs.Reserva
{
	public class ReservaDetalleDTO : ReservaBaseDTO
    {
	    public List<CamaDTO> Camas { get; set; }
        
        public List<HabitacionDTO> HabitacionesPrivadas { get; set; }
    }
}
