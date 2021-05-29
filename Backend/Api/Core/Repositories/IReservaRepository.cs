using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Enums;

namespace Api.Core.Repositories
{
    public interface IReservaRepository : IABMRepository<Reserva>
    {
		Task<IEnumerable<Reserva>> Listar(ReservaEstadoEnum estado);
		Task<IEnumerable<Reserva>> ListarVigentesEntre(DateTime primeraNoche, DateTime ultimaNoche);
	    Task<IEnumerable<Reserva>> ListarCheckoutsDeHoy();
    }
}
