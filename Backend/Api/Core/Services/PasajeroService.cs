using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Core.Services.Interfaces;

namespace Api.Core.Services
{
    public class PasajeroService : IPasajeroService
    {
        private readonly IPasajeroRepository _pasajeroRepository;
        private readonly IUnitOfWork _unitOfWork;

        public PasajeroService(IPasajeroRepository pasajeroRepository, IUnitOfWork unitOfWork)
        {
            _pasajeroRepository = pasajeroRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Pasajero>> ListAsync()
        {
            return await _pasajeroRepository.Listar();
        }

        public async Task<int> CreateAsync(Pasajero pasajero)
        {
            _pasajeroRepository.Crear(pasajero);

            await _unitOfWork.CompleteAsync();
            
            return pasajero.Id;
        }

        public async Task<Pasajero> ObtenerPorId(int id)
        {
	        return await _pasajeroRepository.ObtenerPorId(id);
        }

        public async Task<Pasajero> ObtenerPorDniOPasaporte(string dniOPasaporte)
        {
	        return await _pasajeroRepository.ObtenerPorDniOPasaporte(dniOPasaporte);
        }

        public async Task ModificarAsync(int id, Pasajero pasajero)
        {
	        var huespedAModificar = await _pasajeroRepository.ObtenerPorId(id);

	        if (huespedAModificar == null)
		        throw new AppException($"No se encontró el pasajero de id:{id}");

	        pasajero.Id = huespedAModificar.Id;
	        _pasajeroRepository.Modificar(huespedAModificar, pasajero);

	        await _unitOfWork.CompleteAsync();
        }
    }
}
