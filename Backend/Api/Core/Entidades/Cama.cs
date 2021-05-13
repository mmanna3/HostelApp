using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public abstract class Cama
    {
        public int Id { get; set; }

        [Required, MaxLength(10)]
        public string Nombre { get; set; }

        public ICollection<ReservaCama> ReservaCamas { get; set; }

        protected virtual int Plazas()
        {
            return 1;
        }
        
        public virtual int LugaresLibresEntre(DateTime desde, DateTime hasta)
        {
            var a = EstaLibreEntre(desde, hasta) ? Plazas() : 0;
            return a;
        }

        public bool EstaLibreEntre(DateTime desde, DateTime hasta)
        {
            return !AlgunaReservaIncluyeElDia(desde) && !AlgunaReservaIncluyeElDia(hasta) && !ElRangoIncluyeAlgunaReserva(desde, hasta);
        }

        private bool AlgunaReservaIncluyeElDia(DateTime dia)
        {
            return ReservaCamas?.Select(x => x.Reserva).Any(x => x.EstaReservado(dia)) ?? false;
        }

        private bool ElRangoIncluyeAlgunaReserva(DateTime desde, DateTime hasta)
        {
            return ReservaCamas?.Select(x => x.Reserva).Any(x => x.PrimeraNoche >= desde && x.UltimaNoche <= hasta) ?? false;
        }

        public abstract CamaTipoEnum Tipo();
    }
}
