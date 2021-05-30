using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Enums;
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

        public async Task<IEnumerable<Reserva>> ListarVigentesEntre(DateTime primeraNoche, DateTime ultimaNoche)
        {
	        return await _repository.ListarVigentesEntre(primeraNoche, ultimaNoche);
        }

        public async Task<IEnumerable<Reserva>> Listar(ReservaEstadoEnum? estado, DateTime? checkInDesde, DateTime? checkInHasta)
        {
	        return await _repository.Listar(estado, checkInDesde, checkInHasta);
        }

        public async Task<IEnumerable<Reserva>> ListarCheckoutsDeHoy()
        {
            return await _repository.ListarCheckoutsDeHoy();
        }

        public async Task<Reserva> ObtenerPorId(int id)
        {
	        return await _repository.ObtenerPorId(id);
        }

        public async Task<int> HacerCheckIn(Reserva reservaModificada)
        {
            var reservaExistente = await _repository.ObtenerPorId(reservaModificada.Id);

            if (!reservaExistente.Estado.Equals(ReservaEstadoEnum.CheckinPendiente))
	            throw new AppException("Para hacer Check-In, la reserva debe estar en estado Check-In Pendiente");

            reservaExistente.ReservaPasajerosAnexos = reservaModificada.ReservaPasajerosAnexos;
            reservaExistente.PasajeroTitularId = reservaModificada.PasajeroTitularId;
            reservaExistente.Estado = reservaModificada.Estado;

            await _unitOfWork.CompleteAsync();

	        return reservaExistente.Id;
        }

        public async Task<int> HacerCheckOut(Reserva reservaModificada)
        {
	        var reservaExistente = await _repository.ObtenerPorId(reservaModificada.Id);

	        if (!reservaExistente.Estado.Equals(ReservaEstadoEnum.InHouse))
		        throw new AppException("Para hacer Check-Out, la reserva debe estar en estado In-House");

	        reservaExistente.Estado = reservaModificada.Estado;

	        await _unitOfWork.CompleteAsync();

	        return reservaExistente.Id;
        }

        public async Task<int> Cancelar(Reserva reservaModificada)
        {
	        var reservaExistente = await _repository.ObtenerPorId(reservaModificada.Id);

	        if (!reservaExistente.Estado.Equals(ReservaEstadoEnum.CheckinPendiente))
		        throw new AppException("Para cancelar, la reserva debe estar en estado 'Check-In Pendiente'");

	        reservaExistente.Estado = reservaModificada.Estado;

	        await _unitOfWork.CompleteAsync();

	        return reservaExistente.Id;
        }

        public async Task<int> ObtenerCantidadDeCheckInsDeHoy()
        {
	        return await _repository.ObtenerCantidadDeCheckInsDeHoy();
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
