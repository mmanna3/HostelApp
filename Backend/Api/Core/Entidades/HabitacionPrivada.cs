using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public class HabitacionPrivada : Habitacion
    {
	    public decimal Precio { get; set; }
	    public override HabitacionTipoEnum Tipo()
	    {
		    return HabitacionTipoEnum.Privada;
	    }
    }
}
