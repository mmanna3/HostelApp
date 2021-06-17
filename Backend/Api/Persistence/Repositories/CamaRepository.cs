using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Persistence.Config;

namespace Api.Persistence.Repositories
{
	public class CamaRepository : ABMRepository<Cama>, ICamaRepository
    {
        public CamaRepository(AppDbContext context) : base(context)
        {
        }
    }
}
