using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Api.Core.Repositories
{
    public interface IABMRepository<TModel>
        where TModel : EntidadConId
    {
        Task<IEnumerable<TModel>> Listar();
        EntityEntry<TModel> Crear(TModel reserva);
        Task<TModel> ObtenerPorId(int id);
        void Modificar(TModel anterior, TModel nuevo);
    }
}
