using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Core.Services.Interfaces;

namespace Api.Core.Services
{
    public class ReservaService : IReservaService
    {
        private readonly IReservaRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public ReservaService(IReservaRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Reserva>> Listar()
        {
            return await _repository.Listar();
        }

        public async Task<IEnumerable<Reserva>> ListarMensuales(int anio, int mes)
        {
            return await _repository.ListarMensuales(anio, mes);
        }

        public async Task<IEnumerable<Reserva>> ListarActuales()
        {
            return await _repository.ListarActuales();
        }

        public async Task<IEnumerable<Reserva>> ListarCheckoutsDeHoy()
        {
            return await _repository.ListarCheckoutsDeHoy();
        }

        public async Task<Reserva> ObtenerPorId(int id)
        {
	        return await _repository.ObtenerPorId(id);
        }

        public async Task<int> Crear(Reserva reserva)
        {
            if (HayUnaCamaReservadaDosVeces(reserva))
                throw new AppException("No puede reservarse dos veces la misma cama");

            _repository.Crear(reserva);

            await _unitOfWork.CompleteAsync();
            
            return reserva.Id;
        }

        private static bool HayUnaCamaReservadaDosVeces(Reserva reserva)
        {
            return reserva.ReservaCamas.Select(x => x.CamaId).Count() != reserva.ReservaCamas.Select(x => x.CamaId).Distinct().Count();
        }
    }
}
