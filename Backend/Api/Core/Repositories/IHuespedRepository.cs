using System.Threading.Tasks;
using Api.Core.Entidades;

namespace Api.Core.Repositories
{
    public interface IHuespedRepository : IABMRepository<Huesped>
    {
	    Task<Huesped> ObtenerPorDniOPasaporte(string dniOPasaporte);
    }
}
