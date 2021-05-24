using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Repositories
{
    public class PasajeroRepository : ABMRepository<Pasajero>, IPasajeroRepository
    {
        public PasajeroRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Pasajero> ObtenerPorDniOPasaporte(string dniOPasaporte)
        {
	        return await _context.Pasajeros.SingleOrDefaultAsync(x => x.DniOPasaporte == dniOPasaporte);
        }
    }
}
