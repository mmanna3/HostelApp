using System.Threading.Tasks;
using Api.Core.Entidades;

namespace Api.Core.Repositories
{
    public interface IPasajeroRepository : IABMRepository<Pasajero>
    {
	    Task<Pasajero> ObtenerPorDniOPasaporte(string dniOPasaporte);
    }
}
