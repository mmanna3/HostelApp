using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public abstract class Habitacion : EntidadConId
    {
        [Required, MaxLength(12)]
        public string Nombre { get; set; }

        public abstract HabitacionTipoEnum Tipo();

        [Required]
        public bool TieneBanio { get; set; }

        [MaxLength(140)]
        public string InformacionAdicional { get; set; }

        public ICollection<CamaIndividual> CamasIndividuales { get; set; }
        public ICollection<CamaMatrimonial> CamasMatrimoniales { get; set; }
        public ICollection<CamaCucheta> CamasCuchetas { get; set; }

        public abstract int LugaresLibresEntre(DateTime desde, DateTime hasta);
    }
}
