using System.Collections.Generic;
using Api.Core.Entidades;

namespace Api.Controllers.DTOs
{
    public class ReservasDelPeriodoDTO
    {
        public List<ReservaResumenDTO> Reservas { get; set; }
        public string Desde { get; set; }
        public string Hasta { get; set; }

        public class ReservaResumenDTO
        {
	        public int Id { get; set; }
	        public ReservaEstadoEnum Estado { get; set; }
            public string DiaDeCheckin { get; set; }
            public string DiaDeCheckout { get; set; }
            public List<int> CamasIds { get; set; }
        }
    }
}