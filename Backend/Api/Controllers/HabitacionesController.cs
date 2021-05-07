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
        public async Task<HabitacionDTO> ObtenerPorId(int id)
        {
            var habitacion = await _habitacionService.ObtenerPorId(id);
            return HabitacionMapper.Map(habitacion);
        }

        [HttpGet, Route("conLugaresLibres")]
        public async Task<IEnumerable<HabitacionParaReservaDTO>> ListarConLugaresLibres(DateTime desde, DateTime hasta)
        {
            // Esto está malísimo. Con razón anda lento, salame. Mentira, te quiero.
	        var habitaciones = await _habitacionService.ListarConLugaresLibres();
            return HabitacionMapper.MapHabitacionParaReservaDTO(habitaciones, desde, hasta);
        }

        [HttpPost]
        public async Task<int> Crear([FromBody] HabitacionDTO dto)
        {
            var habitacion = HabitacionMapper.Map(dto);
            return await _habitacionService.CrearAsync(habitacion);
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
