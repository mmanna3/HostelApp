using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Repositories
{
    public class UsuarioRepository : ABMRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Usuario> ObtenerPorNombreDeUsuario(string username)
        {
            return await _context.Usuarios.SingleOrDefaultAsync(x => x.Username == username);
        }
    }
}
