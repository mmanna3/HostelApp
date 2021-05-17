using Api.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Core.Entidades
{
	public class Reserva : EntidadConId
    {
        [Required]
        public ReservaEstadoEnum Estado { get; set; }

        [Required]
        public Huesped Huesped { get; set; }

        [Required]
        public int HuespedId { get; set; }

        public ICollection<ReservaCama> ReservaCamas { get; set; }

        public ICollection<ReservaHabitacionPrivada> ReservaHabitacionesPrivadas { get; set; }

        [Required]
        public DateTime PrimeraNoche { get; set; }

        [Required]
        public DateTime UltimaNoche { get; set; } // Puede ser igual a PrimeraNoche

        [Required]
        public TimeSpan HoraEstimadaDeLlegada { get; set; }
        
        [Required]
        public int CantidadDePasajeros { get; set; }
        public bool EstaReservado(DateTime dia)
        {
            return dia >= PrimeraNoche && dia <= UltimaNoche;
        }

        public string ObtenerNombreAbreviadoDelHuesped()
        {
	        return Huesped.ObtenerNombreAbreviado();
        }
    }
}
