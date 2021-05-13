using System.Collections.Generic;
using System.ComponentModel;
using Api.Controllers.DTOs.Huesped;
using Api.Core.Enums;

namespace Api.Controllers.DTOs.Reserva
{
	public class ReservaDTO
    {
        public int Id { get; set; }
        public ReservaEstadoEnum Estado { get; set; }
        public string HoraEstimadaDeLlegada { get; set; }

        [YKNRequired, YKNRango(Desde = 1, Hasta = 20), DisplayName("Cant. de pasajeros")]
        public int CantidadDePasajeros { get; set; }
        
        public DatosMinimosDeHuespedDTO DatosMinimosDeHuesped { get; set; }

        [YKNRequired, DisplayName("Día de checkin")]
        public string DiaDeCheckin { get; set; }

        [YKNRequired, DisplayName("Día de checkout")]
        public string DiaDeCheckout { get; set; }
        
        public List<int?> CamasIds { get; set; }
        
        public List<List<int>> CamasDeHabitacionesPrivadasIds { get; set; }
    }
}
