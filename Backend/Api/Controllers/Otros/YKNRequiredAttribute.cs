using System.ComponentModel.DataAnnotations;

namespace Api.Controllers.DTOs
{
    public class YKNRequiredAttribute : RequiredAttribute
    {
        public YKNRequiredAttribute()
        {
            ErrorMessage = "El campo '{0}' es requerido.";
        }
    }
}
