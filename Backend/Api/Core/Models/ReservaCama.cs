namespace Api.Core.Models
{
    public class ReservaCama
    {
        public int ReservaId { get; set; }
        public Reserva Reserva { get; set; }
        public int CamaId { get; set; }
        public Cama Cama { get; set; }
    }
}
