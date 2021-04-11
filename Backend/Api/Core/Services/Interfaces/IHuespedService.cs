using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;

namespace Api.Core.Services.Interfaces
{
    public interface IHuespedService
    {
        Task<IEnumerable<Huesped>> ListAsync();
        Task<int> CreateAsync(Huesped huesped);
        Task<Huesped> ObtenerPorId(int id);
        Task<Huesped> ObtenerPorDniOPasaporte(string dniOPasaporte);
        Task ModificarAsync(int id, Huesped habitacion);
    }
}
