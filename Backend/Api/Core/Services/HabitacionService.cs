using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Core.Services.Interfaces;

namespace Api.Core.Services
{
    public class HabitacionService : IHabitacionService
    {
        private readonly IHabitacionRepository _habitacionRepository;
        private readonly IUnitOfWork _unitOfWork;

        public HabitacionService(IHabitacionRepository habitacionRepository, IUnitOfWork unitOfWork)
        {
            _habitacionRepository = habitacionRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Habitacion>> ListarAsync()
        {
            return await _habitacionRepository.Listar();
        }

        public async Task<IEnumerable<Habitacion>> ListarConLugaresLibres()
        {
            return await _habitacionRepository.ListarConCamasLibres();
        }

        public async Task<IEnumerable<Habitacion>> ListarConLugaresLibresEntre(DateTime primeraNoche, DateTime ultimaNoche)
        {
	        return await _habitacionRepository.ListarConCamasLibresEntre(primeraNoche, ultimaNoche);
        }

        public async Task<Habitacion> ObtenerPorId(int id)
        {
            return await _habitacionRepository.ObtenerPorId(id);
        }

        public async Task<int> CrearAsync(Habitacion Habitacion)
        {
            if (HayCamasSinNombre(Habitacion))
                throw new AppException("Todas las camas deben tener Identificador");

            if (HayCamasConIdentificadorRepetido(Habitacion))
                throw new AppException("No puede haber camas con el mismo Identificador");

            _habitacionRepository.Crear(Habitacion);
            await _unitOfWork.CompleteAsync();
            return Habitacion.Id;
        }

        public async Task ModificarAsync(int id, Habitacion Habitacion)
        {
            var habitacionAModificar = await _habitacionRepository.ObtenerPorId(id);

            if (habitacionAModificar == null)
                throw new AppException($"No se encontró la habitación de id:{id}");

            Habitacion.Id = habitacionAModificar.Id;
            _habitacionRepository.Modificar(habitacionAModificar, Habitacion);
            
            await _unitOfWork.CompleteAsync();
        }

        private static bool HayCamasSinNombre(Habitacion Habitacion)
        {
            return Habitacion.CamasIndividuales != null && 
                   Habitacion.CamasIndividuales.ToList().Exists(x => string.IsNullOrEmpty(x.Nombre))
                   ||
                   Habitacion.CamasMatrimoniales != null && 
                   Habitacion.CamasMatrimoniales.ToList().Exists(x => string.IsNullOrEmpty(x.Nombre))
                   ||
                   Habitacion.CamasCuchetas != null && 
                   Habitacion.CamasCuchetas
                       .Select(x => x.Abajo)
                       .ToList()
                       .Exists(x => string.IsNullOrEmpty(x.Nombre))
                   ||
                   Habitacion.CamasCuchetas != null &&
                   Habitacion.CamasCuchetas
                       .Select(x => x.Arriba)
                       .ToList()
                       .Exists(x => string.IsNullOrEmpty(x.Nombre))
                ;
        }

        private static bool HayCamasConIdentificadorRepetido(Habitacion Habitacion)
        {
            var nombres = new List<string>();

            if (Habitacion.CamasMatrimoniales != null)
                nombres.AddRange(Habitacion.CamasMatrimoniales?.Select(x => x.Nombre));

            if (Habitacion.CamasCuchetas != null)
                nombres.AddRange(Habitacion.CamasCuchetas.Select(x => x.Abajo.Nombre)); //Es el mismo nombre arriba y abajo

            if (Habitacion.CamasIndividuales != null)
                nombres.AddRange(Habitacion.CamasIndividuales.Select(x => x.Nombre));

            return nombres.GroupBy(x => x).Any(g => g.Count() > 1);
        }
    }
}
