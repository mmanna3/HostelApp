using System.Collections.Generic;

namespace Api.Controllers.DTOs.Habitacion
{
    public class HabitacionDetalleDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool TieneBanio { get; set; }
        public bool EsPrivada { get; set; }
        public string InformacionAdicional { get; set; }
        public List<CamaDTO> Camas { get; set; }
	}
}
