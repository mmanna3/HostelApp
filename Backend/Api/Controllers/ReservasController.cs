using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Reserva;
using Api.Controllers.Mapping;
using Api.Core;
using Api.Core.Entidades;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
	public class ReservasController : ApiAutenticadoController
    {
        private readonly IReservaService _service;
        private readonly IHuespedService _huespedService;

        public ReservasController(IReservaService service, IHuespedService huespedService)
        {
	        _service = service;
            _huespedService = huespedService;
        }

        [HttpGet, Route("checkoutsDeHoy")]
        public async Task<IEnumerable<CheckoutsDeHoyDTO>> ListarCheckoutsDeHoy()
        {
            var reservas = await _service.ListarCheckoutsDeHoy();
            return ReservaMapper.Map(reservas);
        }

        [HttpGet, Route("obtener")]
        public async Task<ReservaDetalleDTO> ObtenerPorId(int id)
        {
	        var reserva = await _service.ObtenerPorId(id);
	        return ReservaMapper.Map(reserva);
        }

        [HttpGet]
        public async Task<ReservasDelPeriodoDTO> ListarEntre(string primeraNoche, int dias)
        {
	        var primeraNocheDateTime = Utilidades.ConvertirFecha(primeraNoche);
	        var ultimaNoche = primeraNocheDateTime.AddDays(dias - 1);

            var reservas = await _service.ListarEntre(primeraNocheDateTime, ultimaNoche);
            return ReservaMapper.Map(reservas, primeraNocheDateTime, ultimaNoche.AddDays(1));
        }

        [HttpPost]
        public async Task<int> Crear([FromBody] ReservaCreacionDTO creacionDTO)
        {
	        if (creacionDTO.CamasIds != null  && creacionDTO.CamasIds.Count == 0 && creacionDTO.HabitacionesPrivadasIds != null && creacionDTO.HabitacionesPrivadasIds.Count == 0)
		        throw new AppException("Se debe reservar al menos una habitación o cama");

	        if (creacionDTO.CamasIds != null && creacionDTO.CamasIds.Count() != creacionDTO.CamasIds.Distinct().Count())
				throw new AppException("No puede reservarse dos veces la misma cama");

			if (creacionDTO.HabitacionesPrivadasIds != null && creacionDTO.HabitacionesPrivadasIds.Count() != creacionDTO.HabitacionesPrivadasIds.Distinct().Count())
                throw new AppException("No se puede reservar dos veces la misma habitación");

			if (creacionDTO.DiaDeCheckin == creacionDTO.DiaDeCheckout)
				throw new AppException("Se debe reservar al menos una noche");

			var reserva = ReservaMapper.Map(creacionDTO);

			await SiElHuespedYaExisteModificarlo(reserva);

			var id = await _service.Crear(reserva);

            return id;
        }

        private async Task SiElHuespedYaExisteModificarlo(Reserva reserva)
        {
	        var huesped = await _huespedService.ObtenerPorDniOPasaporte(reserva.HuespedTitular.DniOPasaporte);
	        if (huesped != null)
	        {
		        await _huespedService.ModificarAsync(huesped.Id, reserva.HuespedTitular);
		        reserva.HuespedTitular = null;
		        reserva.HuespedTitularId = huesped.Id;
            }
        }
    }
}