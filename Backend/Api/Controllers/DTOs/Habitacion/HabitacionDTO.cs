using System.Collections.Generic;

namespace Api.Controllers.DTOs.Habitacion
{
    public class HabitacionDTO : HabitacionBaseDTO
    {
        public List<CamaDTO> CamasIndividuales { get; set; }
        public List<CamaCuchetaDTO> CamasCuchetas { get; set; }
        public List<CamaDTO> CamasMatrimoniales { get; set; }
	}
}
