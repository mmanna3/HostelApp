using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Core.Models
{
    public class Reserva : EntidadConId
    {
        [Required, MaxLength(30)]
        public string ANombreDe { get; set; }

        public ICollection<ReservaCama> ReservaCamas { get; set; }
        
        public DateTime PrimeraNoche { get; set; }

        public DateTime UltimaNoche { get; set; } // Puede ser igual a PrimeraNoche

        public bool EstaReservado(DateTime dia)
        {
            return dia >= PrimeraNoche && dia <= UltimaNoche;
        }
    }
}
