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
        public Pasajero PasajeroTitular { get; set; }

        [Required]
        public int PasajeroTitularId { get; set; }

        public ICollection<ReservaPasajeroAnexo> ReservaPasajerosAnexos { get; set; }

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

        [Required]
        public string Canal { get; set; }

        public bool EstaReservado(DateTime dia)
        {
            return dia >= PrimeraNoche && dia <= UltimaNoche;
        }

        public string ObtenerNombreAbreviadoDelHuesped()
        {
	        return PasajeroTitular.ObtenerNombreAbreviado();
        }
    }
}
