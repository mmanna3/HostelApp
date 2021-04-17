using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Core;
using Api.Core.Entidades;
using AutoMapper;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Api.Controllers
{
    public class ReservasController : ApiAutenticadoController
    {
        private readonly IReservaService _service;
        private readonly IHuespedService _huespedService;
        private readonly IMapper _mapper;

        public ReservasController(IMapper mapper, IReservaService service, IHuespedService huespedService)
        {
            _mapper = mapper;
            _service = service;
            _huespedService = huespedService;
        }

        //[HttpGet]
        //public async Task<IEnumerable<ReservaDTO>> Listar() // Qué onda? este no se usa?
        //{
        //    var reservas = await _service.Listar();
        //    var reservaDTOs = _mapper.Map<IEnumerable<ReservaDTO>>(reservas);

        //    return reservaDTOs;
        //}

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

        [HttpGet]
        public async Task<ReservasDelPeriodoDTO> ListarEntre(string primeraNoche, int dias)
        {
	        var primeraNocheDateTime = Utilidades.ConvertirFecha(primeraNoche);
	        var ultimaNoche = primeraNocheDateTime.AddDays(dias - 1);

            var reservas = await _service.ListarEntre(primeraNocheDateTime, ultimaNoche);
	        var reservaDTOs = _mapper.Map<ReservasDelPeriodoDTO>(reservas, op =>
	        {
		        op.Items["desde"] = primeraNocheDateTime;
		        op.Items["hasta"] = ultimaNoche.AddDays(1);
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

			if (dto.DiaDeCheckin == dto.DiaDeCheckout)
				throw new AppException("Se debe reservar al menos una noche");

			var reserva = _mapper.Map<Reserva>(dto);

			await SiElHuespedYaExisteModificarlo(reserva);

			var id = await _service.Crear(reserva);

            return id;
        }

        private async Task SiElHuespedYaExisteModificarlo(Reserva reserva)
        {
	        var huesped = await _huespedService.ObtenerPorDniOPasaporte(reserva.Huesped.DniOPasaporte);
	        if (huesped != null)
	        {
		        await _huespedService.ModificarAsync(huesped.Id, reserva.Huesped);
		        reserva.Huesped = null;
		        reserva.HuespedId = huesped.Id;
            }
        }

        [HttpGet, Route("obtener")]
        public async Task<ReservaDTO> ObtenerPorId(int id)
        {
	        var reserva = await _service.ObtenerPorId(id);
	        var reservaDTO = _mapper.Map<ReservaDTO>(reserva);

	        return reservaDTO;
        }
    }
}