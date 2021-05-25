using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Api.Persistence.Repositories
{
    public abstract class ABMRepository<TModel> : BaseRepository, IABMRepository<TModel>
        where TModel : EntidadConId
    {
        protected ABMRepository(AppDbContext context) : base(context)
        {
        }

        public virtual async Task<IEnumerable<TModel>> Listar()
        {
            return await _context.Set<TModel>().ToListAsync();
        }

        public EntityEntry<TModel> Crear(TModel reserva)
        {
            return _context.Set<TModel>().Add(reserva);
        }

        public virtual async Task<TModel> ObtenerPorId(int id)
        {
            return await _context.Set<TModel>().SingleOrDefaultAsync(x => x.Id == id);
        }

        public void Modificar(TModel anterior, TModel nuevo)
        {
            _context.Entry(anterior).CurrentValues.SetValues(nuevo);
        }
    }
}
