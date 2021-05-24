using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs.Pasajero;
using Api.Controllers.DTOs.Reserva;
using Api.Core;

namespace Api.IntegrationTests
{
	public class ReservasHttpClient
	{
		private const string ENDPOINT = "/api/reservas";
		private const string ENDPOINT_PASAJEROS = "/api/pasajeros";
		private readonly HttpClient _httpClient;
		public ReservasHttpClient(HttpClient httpClient)
		{
			_httpClient = httpClient;
		}

		public async Task<HttpResponseMessage> CrearReserva(int? camaId, int? habitacionPrivadaId,
			PasajeroDTO pasajero, DateTime desde, DateTime hasta)
		{
			var body = new ReservaCreacionDTO
			{
				PasajeroTitular = pasajero,
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
			return await _httpClient.GetAsync(ENDPOINT_PASAJEROS);
		}

		public async Task<HttpResponseMessage> ListarCheckoutsDeHoy()
		{
			return await _httpClient.GetAsync(ENDPOINT + "/checkoutsDeHoy");
		}

		public async Task<int> CrearPasajero(PasajeroDTO pasajero)
		{
			var body = new PasajeroDTO
			{
				NombreCompleto = pasajero.NombreCompleto,
				DniOPasaporte = pasajero.DniOPasaporte,
				Email = pasajero.Email,
				Telefono = pasajero.Telefono,
				Pais = pasajero.Pais,
			};

			await _httpClient.PostAsJsonAsync(ENDPOINT_PASAJEROS, body);
			var huespedesDtos = await (await _httpClient.GetAsync(ENDPOINT_PASAJEROS)).Content
				.ReadAsAsync<IEnumerable<PasajeroDTO>>();

			return huespedesDtos.First().Id;
		}
	}
}