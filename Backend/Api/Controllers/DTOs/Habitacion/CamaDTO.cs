using Api.Core.Enums;

namespace Api.Controllers.DTOs.Habitacion
{
    public class CamaDTO
    {
        public int Id { get; set; }

        [YKNStringLength(Maximo = 10)]
        public string Nombre { get; set; }

        public CamaTipoEnum Tipo { get; set; }
    }
}
