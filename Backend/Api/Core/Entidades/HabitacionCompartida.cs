using System;
using System.Linq;
using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public class HabitacionCompartida : Habitacion
    {
	    public override HabitacionTipoEnum Tipo()
	    {
		    return HabitacionTipoEnum.Compartida;
	    }

	    public override int LugaresLibresEntre(DateTime desde, DateTime hasta)
	    {
		    var sumaIndividuales = CamasIndividuales?.Sum(x => x.LugaresLibresEntre(desde, hasta)) ?? 0;
		    var sumaMatri = CamasMatrimoniales?.Sum(x => x.LugaresLibresEntre(desde, hasta)) ?? 0;
		    var sumaCucheta = CamasCuchetas?.Sum(x => x.Abajo.LugaresLibresEntre(desde, hasta) + x.Arriba.LugaresLibresEntre(desde, hasta)) ?? 0;

		    return sumaIndividuales + sumaCucheta + sumaMatri;
	    }
    }
}
