using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Core;
using Api.Core.Models;
using AutoMapper;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ReservasController : ApiAutenticadoController
    {
        private readonly IReservaService _service;
        private readonly IMapper _mapper;

        public ReservasController(IMapper mapper, IReservaService service)
        {
            _mapper = mapper;
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<ReservaDTO>> Listar() // Qué onda? este no se usa?
        {
            var reservas = await _service.Listar();
            var reservaDTOs = _mapper.Map<IEnumerable<ReservaDTO>>(reservas);

            return reservaDTOs;
        }

        [HttpGet, Route("checkoutsDeHoy")]
        public async Task<IEnumerable<CheckoutsDeHoyDTO>> ListarCheckoutsDeHoy()
        {
            var reservas = await _service.ListarCheckoutsDeHoy();
            var reservaDTOs = _mapper.Map<IEnumerable<CheckoutsDeHoyDTO>>(reservas);

            return reservaDTOs;
        }

        [HttpGet, Route("mensuales")]
        public async Task<ReservasDelPeriodoDTO> ListarMensuales(int anio, int mes)
        {
            var reservas = await _service.ListarMensuales(anio, mes);
            var reservaDTOs = _mapper.Map<ReservasDelPeriodoDTO>(reservas, op =>
            {
                op.Items["desde"] = new DateTime(anio, mes, 1);
                op.Items["hasta"] = new DateTime(anio, mes, DateTime.DaysInMonth(anio, mes));
            });

            return reservaDTOs;
        }

        [HttpGet, Route("actuales")]
        public async Task<ReservasDelPeriodoDTO> ListarActuales()
        {
            var reservas = await _service.ListarActuales();
            var reservaDTOs = _mapper.Map<ReservasDelPeriodoDTO>(reservas, op =>
            {
                op.Items["desde"] = DateTime.Today.AddDays(-1);
                op.Items["hasta"] = DateTime.Today.AddDays(15);
            });

            return reservaDTOs;
        }

        [HttpPost]
        public async Task<int> Crear([FromBody] ReservaDTO dto)
        {
            if (dto.CamasIds != null)
            {
                var camasIdsSinNulls = dto.CamasIds.Where(x => x.HasValue).ToList();
                if (camasIdsSinNulls.Count != camasIdsSinNulls.Distinct().Count())
                    throw new AppException("No puede reservarse dos veces la misma cama");
            } 
            
            if (dto.CamasDeHabitacionesPrivadasIds == null && dto.CamasIds == null)
                throw new AppException("Se debe reservar al menos una cama");

            if (dto.Desde == dto.Hasta)
                throw new AppException("Se debe reservar al menos una noche");

            var reserva = _mapper.Map<Reserva>(dto);
            var id = await _service.Crear(reserva);

            return id;
        }

        [HttpGet, Route("{id}")]
        public async Task<ReservaDTO> ObtenerPorId(int id)
        {
	        var reserva = await _service.ObtenerPorId(id);
	        var reservaDTO = _mapper.Map<ReservaDTO>(reserva);

	        return reservaDTO;
        }
    }
}