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

        [Required]
        public bool EstaHabilitada { get; set; }

        [MaxLength(140)]
        public string InformacionAdicional { get; set; }

        public ICollection<CamaIndividual> CamasIndividuales { get; set; }
        public ICollection<CamaMatrimonial> CamasMatrimoniales { get; set; }
        public ICollection<CamaCucheta> CamasCuchetas { get; set; }

        public int CantidadTotalDeLugaresDisponibles()
        {
            var camas = ObtenerTodasLasCamas();            
	        return camas.Sum(x => x.Plazas());
        }

        public List<Cama> ObtenerTodasLasCamas()
		{
            var camas = new List<Cama>();
            camas.AddRange(CamasMatrimoniales);
            camas.AddRange(CamasIndividuales);
            
            if (CamasCuchetas != null)
                foreach (var camaCucheta in CamasCuchetas)
                {
                    if (camaCucheta.Abajo != null)
                        camas.Add(camaCucheta.Abajo);
                    if (camaCucheta.Arriba != null)
                        camas.Add(camaCucheta.Arriba);
                }

            return camas;
        }
    }
}
