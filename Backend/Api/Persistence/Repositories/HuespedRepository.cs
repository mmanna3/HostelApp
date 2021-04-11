using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Repositories
{
    public class HuespedRepository : ABMRepository<Huesped>, IHuespedRepository
    {
        public HuespedRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Huesped> ObtenerPorDniOPasaporte(string dniOPasaporte)
        {
	        return await _context.Huespedes.SingleOrDefaultAsync(x => x.DniOPasaporte == dniOPasaporte);
        }
    }
}
