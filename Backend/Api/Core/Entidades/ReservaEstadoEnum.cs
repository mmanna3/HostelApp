using System.ComponentModel;

namespace Api.Core.Entidades
{
	public enum ReservaEstadoEnum
	{
		[Description("Check-in pendiente")]
		CheckinPendiente = 1,
		
		[Description("In-House")]
		InHouse = 2,

		[Description("Hizo Check-out")]
		HizoCheckout = 3,
	}
}
