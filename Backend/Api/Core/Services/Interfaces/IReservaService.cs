using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Enums;

namespace Api.Core.Services.Interfaces
{
    public interface IReservaService
    {
	    Task<IEnumerable<Reserva>> ListarVigentesEntre(DateTime primeraNoche, DateTime ultimaNoche);
	    Task<IEnumerable<Reserva>> Listar(ReservaEstadoEnum estado);
        Task<int> Crear(Reserva reserva);
        Task<IEnumerable<Reserva>> ListarCheckoutsDeHoy();
        Task<Reserva> ObtenerPorId(int id);
        Task<int> HacerCheckIn(Reserva reservaModificada);
        Task<int> HacerCheckOut(Reserva reservaModificada);
        Task<int> Cancelar(Reserva reserva);
    }
}
