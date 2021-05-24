using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Huesped;
using Api.Controllers.DTOs.Reserva;
using Api.Core;

namespace Api.IntegrationTests
{
	public class ReservasHttpClient
	{
		private const string ENDPOINT = "/api/reservas";
		private const string ENDPOINT_HUESPEDES = "/api/huespedes";
		private readonly HttpClient _httpClient;
		public ReservasHttpClient(HttpClient httpClient)
		{
			_httpClient = httpClient;
		}

		public async Task<HttpResponseMessage> CrearReserva(int? camaId, int? habitacionPrivadaId,
			HuespedDTO datosMinimosDeHuesped, DateTime desde, DateTime hasta)
		{
			var body = new ReservaCreacionDTO
			{
				HuespedTitular = datosMinimosDeHuesped,
				HabitacionesPrivadasIds = habitacionPrivadaId == null ? new List<int>() : new List<int> { (int)habitacionPrivadaId },
				CamasIds = camaId == null ? new List<int>() : new List<int> { (int)camaId },
				DiaDeCheckin = Utilidades.ConvertirFecha(desde),
				DiaDeCheckout = Utilidades.ConvertirFecha(hasta),
				HoraEstimadaDeLlegada = "11:30:00",
				CantidadDePasajeros = 2,
				Canal = "Booking",
			};

			return await _httpClient.PostAsJsonAsync(ENDPOINT, body);
		}

		public async Task<HttpResponseMessage> ListarEntre(string primeraNoche, int dias)
		{
			return await _httpClient.GetAsync(ENDPOINT + $"?primeraNoche={primeraNoche}&dias={dias}");
		}

		public async Task<HttpResponseMessage> ObtenerPorId(int id)
		{
			return await _httpClient.GetAsync(ENDPOINT + $"/obtener?id={id}");
		}

		public async Task<HttpResponseMessage> ListarHuespedes()
		{
			return await _httpClient.GetAsync(ENDPOINT_HUESPEDES);
		}

		public async Task<HttpResponseMessage> ListarCheckoutsDeHoy()
		{
			return await _httpClient.GetAsync(ENDPOINT + "/checkoutsDeHoy");
		}

		public async Task<int> CrearHuesped(DatosMinimosDeHuespedDTO datosMinimosDeHuespedDTO)
		{
			var body = new HuespedDTO
			{
				NombreCompleto = datosMinimosDeHuespedDTO.NombreCompleto,
				DniOPasaporte = datosMinimosDeHuespedDTO.DniOPasaporte,
				Email = datosMinimosDeHuespedDTO.Email,
				Telefono = datosMinimosDeHuespedDTO.Telefono,
				Pais = datosMinimosDeHuespedDTO.Pais,
			};

			await _httpClient.PostAsJsonAsync(ENDPOINT_HUESPEDES, body);
			var huespedesDtos = await (await _httpClient.GetAsync(ENDPOINT_HUESPEDES)).Content
				.ReadAsAsync<IEnumerable<HuespedDTO>>();

			return huespedesDtos.First().Id;
		}
	}
}