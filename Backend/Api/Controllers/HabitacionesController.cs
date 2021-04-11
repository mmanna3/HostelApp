using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Controllers.DTOs.Habitacion;
using AutoMapper;
using Api.Core.Models;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class HabitacionesController : ApiAutenticadoController
    {
        private readonly IHabitacionService _habitacionService;
        private readonly IMapper _mapper;

        public HabitacionesController(IMapper mapper, IHabitacionService habitacionService)
        {
            _mapper = mapper;
            _habitacionService = habitacionService;
        }

        [HttpGet]
        public async Task<IEnumerable<HabitacionDTO>> Listar()
        {
            var habitaciones = await _habitacionService.ListarAsync();
            var habitacionesDTO = _mapper.Map<IEnumerable<HabitacionDTO>>(habitaciones);

            return habitacionesDTO;
        }

        [HttpGet, Route("obtener")]
        public async Task<HabitacionDTO> ObtenerPorId(int id)
        {
            var habitacion = await _habitacionService.ObtenerPorId(id);
            var habitacionDTO = _mapper.Map<HabitacionDTO>(habitacion);

            return habitacionDTO;
        }

        [HttpGet, Route("conLugaresLibres")]
        public async Task<IEnumerable<HabitacionParaReservaDTO>> ListarConLugaresLibres(DateTime desde, DateTime hasta)
        {
            var habitaciones = await _habitacionService.ListarConLugaresLibres();

            var dtos = _mapper.Map<IEnumerable<HabitacionParaReservaDTO>>(habitaciones);
            foreach (var dto in dtos)
            {
                var habitacion = habitaciones.Single(x => x.Id == dto.Id);
                dto.CantidadDeLugaresLibres = habitacion.LugaresLibresEntre(desde, hasta);

                dto.Camas = new List<CamaDTO>();
                dto.Camas.AddRange(_mapper.Map<IEnumerable<CamaDTO>>(habitacion.CamasCuchetas.Select(x => x.Abajo).Where(x => x.EstaLibreEntre(desde, hasta))));
                dto.Camas.AddRange(_mapper.Map<IEnumerable<CamaDTO>>(habitacion.CamasCuchetas.Select(x => x.Arriba).Where(x => x.EstaLibreEntre(desde, hasta))));
                dto.Camas.AddRange(_mapper.Map<IEnumerable<CamaDTO>>(habitacion.CamasMatrimoniales.Where(x => x.EstaLibreEntre(desde, hasta))));
                dto.Camas.AddRange(_mapper.Map<IEnumerable<CamaDTO>>(habitacion.CamasIndividuales.Where(x => x.EstaLibreEntre(desde, hasta))));
            }

            return dtos.OrderByDescending(x => x.CantidadDeLugaresLibres);
        }

        [HttpPost]
        public async Task<int> Crear([FromBody] HabitacionDTO dto)
        {
            var habitacion = _mapper.Map<Habitacion>(dto);
            var id = await _habitacionService.CrearAsync(habitacion);

            return id;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Modificar(int id, [FromBody] HabitacionDTO dto)
        {
            var habitacion = _mapper.Map<Habitacion>(dto);
            await _habitacionService.ModificarAsync(id, habitacion);

            return Ok();
        }
    }
}
