using System.Threading.Tasks;
using Api.Core.Models;

namespace Api.Core.Repositories
{
    public interface IHuespedRepository : IABMRepository<Huesped>
    {
	    Task<Huesped> ObtenerPorDniOPasaporte(string dniOPasaporte);
    }
}
