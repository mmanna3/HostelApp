using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Core.Repositories;
using Api.Core.Services.Interfaces;

namespace Api.Core.Services
{
    public class HuespedService : IHuespedService
    {
        private readonly IHuespedRepository _huespedRepository;
        private readonly IUnitOfWork _unitOfWork;

        public HuespedService(IHuespedRepository huespedRepository, IUnitOfWork unitOfWork)
        {
            _huespedRepository = huespedRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Huesped>> ListAsync()
        {
            return await _huespedRepository.Listar();
        }

        public async Task<int> CreateAsync(Huesped huesped)
        {
            _huespedRepository.Crear(huesped);

            await _unitOfWork.CompleteAsync();
            
            return huesped.Id;
        }

        public async Task<Huesped> ObtenerPorId(int id)
        {
	        return await _huespedRepository.ObtenerPorId(id);
        }

        public async Task<Huesped> ObtenerPorDniOPasaporte(string dniOPasaporte)
        {
	        return await _huespedRepository.ObtenerPorDniOPasaporte(dniOPasaporte);
        }

        public async Task ModificarAsync(int id, Huesped huesped)
        {
	        var huespedAModificar = await _huespedRepository.ObtenerPorId(id);

	        if (huespedAModificar == null)
		        throw new AppException($"No se encontró el huésped de id:{id}");

	        huesped.Id = huespedAModificar.Id;
	        _huespedRepository.Modificar(huespedAModificar, huesped);

	        await _unitOfWork.CompleteAsync();
        }
    }
}
