using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;

namespace Api.Core.Services.Interfaces
{
    public interface IReservaService
    {
        Task<IEnumerable<Reserva>> Listar();
        Task<IEnumerable<Reserva>> ListarEntre(DateTime primeraNoche, DateTime ultimaNoche);
        Task<int> Crear(Reserva reserva);
        Task<IEnumerable<Reserva>> ListarMensuales(int anio, int mes);
        Task<IEnumerable<Reserva>> ListarActuales();
        Task<IEnumerable<Reserva>> ListarCheckoutsDeHoy();
        Task<Reserva> ObtenerPorId(int id);
    }
}
