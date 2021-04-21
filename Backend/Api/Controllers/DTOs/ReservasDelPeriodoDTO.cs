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
            public int DiaDeCheckin { get; set; }
            public int DiaDeCheckout { get; set; }
            public List<int> CamasIds { get; set; }
        }
    }
}