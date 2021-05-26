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
			var sumaIndividuales = CamasIndividuales?.Sum(x => x.LugaresLibresEntre(desde, hasta)) ?? 0;
			var sumaMatri = CamasMatrimoniales?.Sum(x => x.LugaresLibresEntre(desde, hasta)) ?? 0;
			var sumaCucheta = CamasCuchetas?.Sum(x => x.Abajo.LugaresLibresEntre(desde, hasta) + x.Arriba.LugaresLibresEntre(desde, hasta)) ?? 0;
			var lugaresTotales = sumaIndividuales + sumaMatri + sumaCucheta;

			return EstaLibreEntre(desde, hasta) ? lugaresTotales : 0;
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
