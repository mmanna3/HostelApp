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
        public Habitacion()
		{
            CamasCuchetas = new List<CamaCucheta>();
            CamasIndividuales = new List<CamaIndividual>();
            CamasMatrimoniales = new List<CamaMatrimonial>();
        }
        
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

        public int CantidadTotalDeLugaresDisponibles()
        {
	        var lugaresDeCamasIndividuales = CamasIndividuales?.Count ?? 0;
	        var lugaresDeCamasMatrimoniales = CamasMatrimoniales?.Count * 2 ?? 0;
	        var lugaresDeCamasCuchetas = 0;

            if (CamasCuchetas != null)
	            foreach (var camaCucheta in CamasCuchetas)
	            {
		            if (camaCucheta.Abajo != null)
			            lugaresDeCamasCuchetas++;
                    if (camaCucheta.Arriba != null)
	                    lugaresDeCamasCuchetas++;
	            }

	        return lugaresDeCamasIndividuales + lugaresDeCamasMatrimoniales + lugaresDeCamasCuchetas;
        }

        public abstract int LugaresLibresEntre(DateTime desde, DateTime hasta);
    }
}
