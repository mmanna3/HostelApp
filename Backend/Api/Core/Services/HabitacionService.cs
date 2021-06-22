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
        private readonly ICamaRepository _camaRepository;
        private readonly IUnitOfWork _unitOfWork;

        public HabitacionService(IHabitacionRepository habitacionRepository, ICamaRepository camaRepository, IUnitOfWork unitOfWork)
        {
            _habitacionRepository = habitacionRepository;
            _camaRepository = camaRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Habitacion>> ListarAsync()
        {
            return await _habitacionRepository.Listar();
        }

        public async Task<IEnumerable<Habitacion>> ListarConLugaresLibresEntre(DateTime primeraNoche, DateTime ultimaNoche)
        {
	        return await _habitacionRepository.ListarConCamasLibresEntre(primeraNoche, ultimaNoche);
        }

        public async Task<Habitacion> ObtenerPorId(int id)
        {
            return await _habitacionRepository.ObtenerPorId(id);
        }

        public async Task<int> CrearAsync(Habitacion habitacion)
        {
            if (HayCamasSinNombre(habitacion))
                throw new AppException("Todas las camas deben tener Identificador");

            if (HayCamasConIdentificadorRepetido(habitacion))
                throw new AppException("No puede haber camas con el mismo Identificador");

            var habitaciones = await _habitacionRepository.Listar();
            if (habitaciones.Any(x => x.Nombre.ToLower() == habitacion.Nombre.ToLower()))
                throw new AppException("Ya existe una habitación con ese nombre");

            _habitacionRepository.Crear(habitacion);
            await _unitOfWork.CompleteAsync();
            return habitacion.Id;
        }

        public async Task ModificarAsync(int id, Habitacion habitacion)
        {
            var habitacionAModificar = await _habitacionRepository.ObtenerPorId(id);

            if (habitacionAModificar == null)
                throw new AppException($"No se encontró la habitación de id:{id}");

            habitacion.Id = habitacionAModificar.Id;
            _habitacionRepository.Modificar(habitacionAModificar, habitacion);
            
            await _unitOfWork.CompleteAsync();
        }

        private static bool HayCamasSinNombre(Habitacion habitacion)
        {
            return habitacion.CamasIndividuales != null && 
                   habitacion.CamasIndividuales.ToList().Exists(x => string.IsNullOrEmpty(x.Nombre))
                   ||
                   habitacion.CamasMatrimoniales != null && 
                   habitacion.CamasMatrimoniales.ToList().Exists(x => string.IsNullOrEmpty(x.Nombre))
                   ||
                   habitacion.CamasCuchetas != null && 
                   habitacion.CamasCuchetas
                       .Select(x => x.Abajo)
                       .ToList()
                       .Exists(x => string.IsNullOrEmpty(x.Nombre))
                   ||
                   habitacion.CamasCuchetas != null &&
                   habitacion.CamasCuchetas
                       .Select(x => x.Arriba)
                       .ToList()
                       .Exists(x => string.IsNullOrEmpty(x.Nombre))
                ;
        }

        private static bool HayCamasConIdentificadorRepetido(Habitacion habitacion)
        {
            var nombres = new List<string>();

            if (habitacion.CamasMatrimoniales != null)
                nombres.AddRange(habitacion.CamasMatrimoniales?.Select(x => x.Nombre));

            if (habitacion.CamasCuchetas != null)
                nombres.AddRange(habitacion.CamasCuchetas.Select(x => x.Abajo.Nombre)); //Es el mismo nombre arriba y abajo

            if (habitacion.CamasIndividuales != null)
                nombres.AddRange(habitacion.CamasIndividuales.Select(x => x.Nombre));

            return nombres.GroupBy(x => x).Any(g => g.Count() > 1);
        }

		public async Task Deshabilitar(int id)
		{
            var habitacionAModificar = await _habitacionRepository.ObtenerPorId(id);

            if (habitacionAModificar == null)
                throw new AppException($"No se encontró la habitación de id:{id}");


            var habitacionModificada = habitacionAModificar;
            habitacionModificada.EstaHabilitada = false;
            _habitacionRepository.Modificar(habitacionAModificar, habitacionModificada);

            await _unitOfWork.CompleteAsync();
        }

		public async Task Habilitar(int id)
		{
            var habitacionAModificar = await _habitacionRepository.ObtenerPorId(id);

            if (habitacionAModificar == null)
                throw new AppException($"No se encontró la habitación de id:{id}");

            var habitacionModificada = habitacionAModificar;
            habitacionModificada.EstaHabilitada = true;
            _habitacionRepository.Modificar(habitacionAModificar, habitacionModificada);

            await _unitOfWork.CompleteAsync();
        }

        public async Task DeshabilitarCama(int id)
        {
            var camaAModificar = await _camaRepository.ObtenerPorId(id);
            
            if (camaAModificar == null)
                throw new AppException($"No se encontró la cama de id:{id}");


            var camaModificada = camaAModificar;
            camaModificada.EstaHabilitada = false;
            _camaRepository.Modificar(camaAModificar, camaModificada);

            await _unitOfWork.CompleteAsync();
        }

        public async Task HabilitarCama(int id)
        {
            var camaAModificar = await _camaRepository.ObtenerPorId(id);

            if (camaAModificar == null)
                throw new AppException($"No se encontró la cama de id:{id}");

            var camaModificada = camaAModificar;
            camaModificada.EstaHabilitada = true;
            _camaRepository.Modificar(camaAModificar, camaModificada);

            await _unitOfWork.CompleteAsync();
        }
    }
}
