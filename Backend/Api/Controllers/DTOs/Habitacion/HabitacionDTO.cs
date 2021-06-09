using System.Collections.Generic;
using System.ComponentModel;

namespace Api.Controllers.DTOs.Habitacion
{
    public class HabitacionDTO
    {
        public int Id { get; set; }

        [YKNRequired, YKNStringLength(Maximo = 12)]
        public string Nombre { get; set; }

        [YKNRequired]
        public bool TieneBanio { get; set; }

        [YKNRequired]
        public bool EsPrivada { get; set; }

        [YKNStringLength(Maximo = 140)]
        [DisplayName("Información adicional")]
        public string InformacionAdicional { get; set; }

        public List<CamaDTO> CamasIndividuales { get; set; }

        public List<CamaCuchetaDTO> CamasCuchetas { get; set; }

        public List<CamaDTO> CamasMatrimoniales { get; set; }
	}
}
