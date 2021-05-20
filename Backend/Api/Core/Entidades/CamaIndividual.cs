using System;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public class CamaIndividual : Cama
    {
        [Column("Individual_HabitacionId")]
        public int HabitacionId { get; set; }
        public Habitacion Habitacion { get; set; }

        public override Habitacion ObtenerHabitacion()
        {
	        return Habitacion;
        }

        public override CamaTipoEnum Tipo()
        {
            return CamaTipoEnum.Individual;
        }
    }
}
