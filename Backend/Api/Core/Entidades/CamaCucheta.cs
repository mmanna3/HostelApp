using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entidades
{
    public class CamaCucheta
    {
        public int Id { get; set; }
        public int AbajoId { get; set; }
        public CamaCuchetaDeAbajo Abajo { get; set; }
        public int ArribaId { get; set; }
        public CamaCuchetaDeArriba Arriba { get; set; }
        public int HabitacionId { get; set; }
        public Habitacion Habitacion { get; set; }
    }
}
