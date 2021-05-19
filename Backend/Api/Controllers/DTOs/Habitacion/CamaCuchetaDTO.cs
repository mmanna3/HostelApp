namespace Api.Controllers.DTOs.Habitacion
{
    public class CamaCuchetaDTO
    {
        public int Id { get; set; }
        
        [YKNStringLength(Maximo = 10)]
        public string Nombre { get; set; }
        
        public CamaDTO Abajo { get; set; }
        
        public CamaDTO Arriba { get; set; }
    }
}
