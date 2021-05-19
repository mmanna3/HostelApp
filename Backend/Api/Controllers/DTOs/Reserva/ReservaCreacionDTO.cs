using System.Collections.Generic;
using System.ComponentModel;
using Api.Controllers.DTOs.Huesped;
using Api.Core.Enums;

namespace Api.Controllers.DTOs.Reserva
{
	public class ReservaCreacionDTO : ReservaBaseDTO
    {
	    public List<int> CamasIds { get; set; }
        
        public List<int> HabitacionesPrivadasIds { get; set; }
    }
}
