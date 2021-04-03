using System.Collections.Generic;
using System.ComponentModel;

namespace Api.Controllers.DTOs
{
    public class ReservaDTO
    {
        public int Id { get; set; }

        [YKNRequired, YKNStringLength(Maximo = 30)]
        [DisplayName("Huésped")]
        public string ANombreDe { get; set; }

        //Primera noche
        public string DiaDeCheckin { get; set; }
        
        //Día en el que hace checkout (no puede ser igual a Desde) ¿Vas a hacer refactor?
        public string DiaDeCheckout { get; set; }
        public List<int?> CamasIds { get; set; }
        public List<List<int>> CamasDeHabitacionesPrivadasIds { get; set; }
    }
}
