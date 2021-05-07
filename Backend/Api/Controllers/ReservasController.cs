using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
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
        public async Task<ReservaDTO> ObtenerPorId(int id)
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

			var reserva = ReservaMapper.Map(dto);

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
    }
}