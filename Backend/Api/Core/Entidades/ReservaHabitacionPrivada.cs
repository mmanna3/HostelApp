namespace Api.Core.Entidades
{
    public class ReservaHabitacionPrivada
    {
        public int ReservaId { get; set; }
        public Reserva Reserva { get; set; }
        public int HabitacionPrivadaId { get; set; }
        public HabitacionPrivada HabitacionPrivada { get; set; }
    }
}
