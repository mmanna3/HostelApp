using System.ComponentModel.DataAnnotations;

namespace Api.Controllers.DTOs
{
	public class YKNRango : ValidationAttribute
	{
		public int Desde { get; set; }
		public int Hasta { get; set; }

		public YKNRango()
		{
			this.Desde = 0;
			this.Hasta = int.MaxValue;
		}

		public override bool IsValid(object value)
		{
			var intValue = value as int?;

			if (intValue != null)
			{
				if (intValue < Desde)
				{
					ErrorMessage = $@"El mínimo permitido para el campo '{{0}}' es {Desde}.";
					return false;
				}


				if (intValue > Hasta)
				{
					ErrorMessage = $@"El máximo permitido para el campo '{{0}}' es {Hasta}.";
					return false;
				}				

			}
			return true;
		}
	}
}
