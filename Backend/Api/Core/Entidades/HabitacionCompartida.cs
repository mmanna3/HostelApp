using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public class HabitacionCompartida : Habitacion
    {
	    public override HabitacionTipoEnum Tipo()
	    {
		    return HabitacionTipoEnum.Compartida;
	    }
    }
}
