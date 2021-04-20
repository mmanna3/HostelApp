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

        [Required]
        public ICollection<ReservaCama> ReservaCamas { get; set; }

        [Required]
        public DateTime PrimeraNoche { get; set; }

        [Required]
        public DateTime UltimaNoche { get; set; } // Puede ser igual a PrimeraNoche

        public bool EstaReservado(DateTime dia)
        {
            return dia >= PrimeraNoche && dia <= UltimaNoche;
        }
    }
}
