using System.ComponentModel.DataAnnotations.Schema;
using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public class CamaCuchetaDeArriba : Cama
    {
		[Column("CamaCuchetaDeArriba_CuchetaId")]
		public int CamaCuchetaId { get; set; }
	    public CamaCucheta CamaCucheta { get; set; }

	    public override Habitacion ObtenerHabitacion()
	    {
		    return CamaCucheta.Habitacion;
	    }

        public override CamaTipoEnum Tipo()
        {
            return CamaTipoEnum.CuchetaArriba;
        }
    }
}
