namespace Api.Core.Entidades
{
    public class ReservaPasajeroAnexo
    {
        public int ReservaId { get; set; }
        public Reserva Reserva { get; set; }
        public int PasajeroId { get; set; }
        public Pasajero Pasajero { get; set; }
    }
}
