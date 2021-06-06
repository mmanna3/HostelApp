using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;

namespace Api.Core.Repositories
{
    public interface IHabitacionRepository : IABMRepository<Habitacion>
    {
        Task<IEnumerable<Habitacion>> ListarConCamasLibres();
        Task<IEnumerable<Habitacion>> ListarConCamasLibresEntre(DateTime primeraNoche, DateTime ultimaNoche);
    }
}
