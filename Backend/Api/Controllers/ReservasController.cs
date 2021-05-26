using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Pasajero;
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
        private readonly IPasajeroService _pasajeroService;

        public ReservasController(IReservaService service, IPasajeroService pasajeroService)
        {
	        _service = service;
            _pasajeroService = pasajeroService;
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

        [HttpGet, Route("vigentes")]
        public async Task<ReservasDelPeriodoDTO> ListarVigentesEntre(string primeraNoche, int dias)
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

			await SiElPasajeroTitularYaExisteModificarloSinoCrearlo(reserva);

			var id = await _service.Crear(reserva);

            return id;
        }

        [HttpPost, Route("hacerCheckIn")]
        public async Task<int> HacerCheckIn([FromBody] HacerCheckInDTO dto)
        {
	        ValidarQueNoEsteDosVecesElMismoPasajero(dto);

	        var reserva = ReservaMapper.Map(dto);

            await SiElPasajeroTitularYaExisteModificarloSinoCrearlo(reserva);
            await SiAlgunPasajeroAnexoYaExisteModificarlo(reserva);

            await _service.HacerCheckIn(reserva);
            
            return reserva.Id;
        }

        [HttpPost, Route("hacerCheckOut")]
        public async Task<int> HacerCheckOut([FromBody] HacerCheckOutDTO dto)
        {
	        var reserva = ReservaMapper.Map(dto);

	        await _service.HacerCheckOut(reserva);

	        return reserva.Id;
        }

        private static void ValidarQueNoEsteDosVecesElMismoPasajero(HacerCheckInDTO dto)
        {
	        if (dto.PasajerosAnexos != null)
			{
				var dnisOPasaportesDeTodosLosPasajeros = new List<string>(dto.PasajerosAnexos.Select(x => x.DniOPasaporte)) { dto.PasajeroTitular.DniOPasaporte };

				if (dnisOPasaportesDeTodosLosPasajeros.Count != dnisOPasaportesDeTodosLosPasajeros.Distinct().Count())
					throw new AppException("No puede haber pasajeros con el mismo DNI o Pasaporte");
			}
        }

        private async Task SiElPasajeroTitularYaExisteModificarloSinoCrearlo(Reserva reserva)
        {
	        var pasajeroId = await _pasajeroService.SiExisteModificarSinoCrear(reserva.PasajeroTitular);
	        reserva.PasajeroTitularId = pasajeroId;
	        reserva.PasajeroTitular = null;
        }

        private async Task SiAlgunPasajeroAnexoYaExisteModificarlo(Reserva reserva)
        {
	        if (reserva.ReservaPasajerosAnexos != null)
		        foreach (var reservaPasajeroAnexo in reserva.ReservaPasajerosAnexos)
		        {
			        var pasajero = await _pasajeroService.ObtenerPorDniOPasaporte(reservaPasajeroAnexo.Pasajero.DniOPasaporte);
			        if (pasajero != null)
			        {
				        await _pasajeroService.SiExisteModificarSinoCrear(reservaPasajeroAnexo.Pasajero);

				        reservaPasajeroAnexo.Pasajero = null;
				        reservaPasajeroAnexo.PasajeroId = pasajero.Id;
			        }
	            }
        }
    }
}