using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Api.Core.Entidades
{
    public class Habitacion : EntidadConId
    {
        [Required, MaxLength(12)]
        public string Nombre { get; set; }

        [Required]
        public bool TieneBanio { get; set; }

        [Required]
        public bool EsPrivada { get; set; }

        [MaxLength(140)]
        public string InformacionAdicional { get; set; }

        public ICollection<CamaIndividual> CamasIndividuales { get; set; }
        public ICollection<CamaMatrimonial> CamasMatrimoniales { get; set; }
        public ICollection<CamaCucheta> CamasCuchetas { get; set; }

        public int LugaresLibresEntre(DateTime desde, DateTime hasta)
        {
            var sumaIndividuales = CamasIndividuales?.Sum(x => x.LugaresLibresEntre(desde, hasta)) ?? 0;
            var sumaMatri = CamasMatrimoniales?.Sum(x => x.LugaresLibresEntre(desde, hasta)) ?? 0;
            var sumaCucheta = CamasCuchetas?.Sum(x => x.Abajo.LugaresLibresEntre(desde, hasta) + x.Arriba.LugaresLibresEntre(desde, hasta)) ?? 0;

            return sumaIndividuales + sumaCucheta + sumaMatri;
        }
    }
}
