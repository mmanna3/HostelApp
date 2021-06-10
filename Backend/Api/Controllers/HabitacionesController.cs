using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.Mapping;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class HabitacionesController : ApiAutenticadoController
    {
        private readonly IHabitacionService _habitacionService;

        public HabitacionesController(IHabitacionService habitacionService)
        {
	        _habitacionService = habitacionService;
        }

        [HttpGet]
        public async Task<IEnumerable<HabitacionDTO>> Listar()
        {
            var habitaciones = await _habitacionService.ListarAsync();
            return HabitacionMapper.Map(habitaciones);
        }

        [HttpGet, Route("obtener")]
        public async Task<HabitacionDetalleDTO> ObtenerPorId(int id)
        {
            var habitacion = await _habitacionService.ObtenerPorId(id);
            return HabitacionMapper.MapDetalle(habitacion);
        }

        [HttpGet, Route("conLugaresLibres")]
        public async Task<IEnumerable<HabitacionConLugaresLibresDTO>> ListarConLugaresLibres(DateTime desde, DateTime hasta)
        {
	        var habitaciones = await _habitacionService.ListarConLugaresLibresEntre(desde, hasta);
            return HabitacionMapper.MapHabitacionesConLugaresLugares(habitaciones);
        }

        [HttpPost]
        public async Task<int> Crear([FromBody] HabitacionDTO dto)
        {
            var habitacion = HabitacionMapper.Map(dto);
            return await _habitacionService.CrearAsync(habitacion);
        }

        [HttpPost, Route("deshabilitar")]
        public async Task Deshabilitar([FromBody] CambiarHabilitacionDTO dto)
        {
            await _habitacionService.Deshabilitar(dto.Id);
        }

        [HttpPost, Route("habilitar")]
        public async Task Habilitar([FromBody] int id)
        {
            await _habitacionService.Habilitar(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Modificar(int id, [FromBody] HabitacionDTO dto)
        {
            var habitacion = HabitacionMapper.Map(dto);
            await _habitacionService.ModificarAsync(id, habitacion);

            return Ok();
        }
    }
}
