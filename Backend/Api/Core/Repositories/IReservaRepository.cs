using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Enums;

namespace Api.Core.Repositories
{
    public interface IReservaRepository : IABMRepository<Reserva>
    {
		Task<int> ObtenerCantidadDeCheckInsDeHoy();
		Task<int> ObtenerCantidadDeCheckOutsDeHoy();
		Task<IEnumerable<Reserva>> Listar(ReservaEstadoEnum? estado, DateTime? checkInDesde, DateTime? checkInHasta, DateTime? checkOutDesde, DateTime? checkOutHasta);
		Task<IEnumerable<Reserva>> ListarVigentesEntre(DateTime primeraNoche, DateTime ultimaNoche);
    }
}
