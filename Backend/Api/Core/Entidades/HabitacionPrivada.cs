using System;
using System.Collections.Generic;
using System.Linq;
using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public class HabitacionPrivada : Habitacion
    {
	    public decimal Precio { get; set; }
	    public ICollection<ReservaHabitacionPrivada> ReservaHabitacionesPrivadas { get; set; }
		public override HabitacionTipoEnum Tipo()
	    {
		    return HabitacionTipoEnum.Privada;
	    }
    }
}
