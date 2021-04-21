using System.Collections.Generic;
using System.ComponentModel;
using Api.Core.Entidades;

namespace Api.Controllers.DTOs
{
    public class ReservaDTO
    {
        public int Id { get; set; }
        public ReservaEstadoEnum Estado { get; set; }
        public DatosMinimosDeHuespedDTO DatosMinimosDeHuesped { get; set; }

        [YKNRequired, DisplayName("Día de checkin")]
        public string DiaDeCheckin { get; set; }

        [YKNRequired, DisplayName("Día de checkout")]
        public string DiaDeCheckout { get; set; }
        
        public List<int?> CamasIds { get; set; }
        
        public List<List<int>> CamasDeHabitacionesPrivadasIds { get; set; }
    }
}
