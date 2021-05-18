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

		public override int LugaresLibresEntre(DateTime desde, DateTime hasta)
		{
			var totalDeLugares = (CamasIndividuales?.Sum(x => x.Plazas()) + CamasMatrimoniales?.Sum(x => x.Plazas()) + CamasCuchetas?.Sum(x => x.Abajo.Plazas() + x.Arriba.Plazas()) ?? 0);
			return EstaLibreEntre(desde, hasta) ? totalDeLugares : 0;
		}

		public bool EstaLibreEntre(DateTime desde, DateTime hasta)
		{
			var a = !AlgunaReservaIncluyeElDia(desde);
			var b = !AlgunaReservaIncluyeElDia(hasta);
			var c = !ElRangoIncluyeAlgunaReserva(desde, hasta);

			return a && b && c;
		}

		private bool AlgunaReservaIncluyeElDia(DateTime dia)
		{
			return ReservaHabitacionesPrivadas?.Select(x => x.Reserva).Any(x => x.EstaReservado(dia)) ?? false;
		}

		private bool ElRangoIncluyeAlgunaReserva(DateTime desde, DateTime hasta)
		{
			return ReservaHabitacionesPrivadas?.Select(x => x.Reserva).Any(x => x.PrimeraNoche >= desde && x.UltimaNoche <= hasta) ?? false;
		}
    }
}
