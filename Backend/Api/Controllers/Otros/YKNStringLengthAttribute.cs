using System.ComponentModel.DataAnnotations;

namespace Api.Controllers.DTOs
{
	public class YKNStringLengthAttribute : ValidationAttribute
	{
		public int Minimo { get; set; }
		public int Maximo { get; set; }

		public YKNStringLengthAttribute()
		{
			this.Minimo = 0;
			this.Maximo = int.MaxValue;			
		}

		public override bool IsValid(object value)
		{
			var strValue = value as string;

			if (!string.IsNullOrEmpty(strValue))
			{
				var len = strValue.Length;

				if (!string.IsNullOrEmpty(ErrorMessage))
					return len >= Minimo && len <= Maximo;

				if (len < Minimo)
				{
					ErrorMessage = $@"El campo {{0}} debe tener como mínimo {Minimo} caracteres.";
					return false;
				}


				if (len > Maximo)
				{
					ErrorMessage = $@"El campo {{0}} debe tener como máximo {Maximo} caracteres.";
					return false;
				}				

			}
			return true;
		}
	}
}
