using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Api.Core.Enums;

namespace Api.Core.Entidades
{
    public abstract class Cama : EntidadConId
    {
        [Required, MaxLength(10)]
        public string Nombre { get; set; }        
        [Required]
        public bool EstaHabilitada { get; set; }
        public ICollection<ReservaCama> ReservaCamas { get; set; }
        public abstract Habitacion ObtenerHabitacion();

        public virtual int Plazas()
        {
            return 1;
        }        

        public abstract CamaTipoEnum Tipo();
    }
}
