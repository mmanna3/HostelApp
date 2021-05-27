using System.Collections.Generic;

namespace Api.Controllers.DTOs.Reserva
{
	public class ReservasDelPeriodoDTO
    {
        public List<ReservaResumenDTO> Reservas { get; set; }
        public string Desde { get; set; }
        public string Hasta { get; set; }
    }
}