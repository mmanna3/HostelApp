using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;

namespace Api.Core.Repositories
{
    public interface IABMRepository<TModel>
        where TModel : EntidadConId
    {
        Task<IEnumerable<TModel>> Listar();
        void Crear(TModel reserva);
        Task<TModel> ObtenerPorId(int id);
        void Modificar(TModel anterior, TModel nuevo);
    }
}
