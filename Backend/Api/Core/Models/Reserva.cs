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
        
        //Primera noche
        public DateTime PrimeraNoche { get; set; }

        //Última noche (puede ser igual a la primera) ¿vas a hacer refactor de nombre?
        public DateTime UltimaNoche { get; set; }

        public bool EstaReservado(DateTime dia)
        {
            return dia >= PrimeraNoche && dia <= UltimaNoche;
        }
    }
}
