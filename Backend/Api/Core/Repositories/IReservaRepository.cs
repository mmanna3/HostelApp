using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;

namespace Api.Core.Repositories
{
    public interface IReservaRepository : IABMRepository<Reserva>
    {
	    Task<IEnumerable<Reserva>> ListarEntre(DateTime primeraNoche, DateTime ultimaNoche);
	    Task<IEnumerable<Reserva>> ListarMensuales(int anio, int mes);
        Task<IEnumerable<Reserva>> ListarActuales();
        Task<IEnumerable<Reserva>> ListarCheckoutsDeHoy();
    }
}
