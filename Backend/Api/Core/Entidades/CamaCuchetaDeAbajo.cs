using System.ComponentModel.DataAnnotations.Schema;
using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public class CamaCuchetaDeAbajo : Cama
    {
		[Column("CamaCuchetaDeAbajo_CuchetaId")]
		public int CamaCuchetaId { get; set; }
	    public CamaCucheta CamaCucheta { get; set; }

		public override Habitacion ObtenerHabitacion()
		{
			return CamaCucheta.Habitacion;
		}

		public override CamaTipoEnum Tipo()
        {
            return CamaTipoEnum.CuchetaAbajo;
        }
    }
}
