using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Core.Entidades
{
    public class CamaIndividual : Cama
    {
        [Column("Individual_HabitacionId")]
        public int HabitacionId { get; set; }
        public Habitacion Habitacion { get; set; }
        public override string Tipo()
        {
            return "Individual";
        }
    }
}
