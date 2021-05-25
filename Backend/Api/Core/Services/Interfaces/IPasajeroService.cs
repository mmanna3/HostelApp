using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;

namespace Api.Core.Services.Interfaces
{
    public interface IPasajeroService
    {
        Task<IEnumerable<Pasajero>> ListAsync();
        Task<int> CreateAsync(Pasajero pasajero);
        Task<Pasajero> ObtenerPorId(int id);
        Task<Pasajero> ObtenerPorDniOPasaporte(string dniOPasaporte);
        Task<int> SiExisteCrearSinoModificar(Pasajero pasajero);
    }
}
