using System.Collections.Generic;
using Api.Core.Enums;

namespace Api.Controllers.DTOs.Reserva
{
	public class ReservaResumenDTO
    {
        public int Id { get; set; }
        public string NombreAbreviadoDelPasajero { get; set; }
        public ReservaEstadoEnum Estado { get; set; }
        public string DiaDeCheckin { get; set; }
        public string DiaDeCheckout { get; set; }
        public List<int> CamasIds { get; set; }
    }
}