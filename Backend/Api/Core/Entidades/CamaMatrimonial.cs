using System.ComponentModel.DataAnnotations.Schema;
using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public class CamaMatrimonial : Cama
    {
        [Column("Matrimonial_HabitacionId")]
        public int HabitacionId { get; set; }
        public Habitacion Habitacion { get; set; }
        protected override int Plazas()
        {
            return 2;
        }
        public override CamaTipoEnum Tipo()
        {
            return CamaTipoEnum.Matrimonial;
        }
    }
}
