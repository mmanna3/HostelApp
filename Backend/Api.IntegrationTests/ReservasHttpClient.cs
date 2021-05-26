using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs.Pasajero;
using Api.Controllers.DTOs.Reserva;
using Api.Core;
using FluentAssertions;

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

		public async Task<int> CrearReserva(int? camaId, int? habitacionPrivadaId,
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

			var respuesta = await _httpClient.PostAsJsonAsync(ENDPOINT, body);
			respuesta.StatusCode.Should().Be(HttpStatusCode.OK);
			return await respuesta.Content.ReadAsAsync<int>();
		}

		public async Task<ReservasDelPeriodoDTO> ListarVigentesEntre(string primeraNoche, int dias)
		{
			var respuesta = await _httpClient.GetAsync(ENDPOINT + $"/vigentes?primeraNoche={primeraNoche}&dias={dias}");
			respuesta.StatusCode.Should().Be(HttpStatusCode.OK);
			return await respuesta.Content.ReadAsAsync<ReservasDelPeriodoDTO>();
		}

		public async Task<ReservaDetalleDTO> ObtenerPorId(int id)
		{
			var respuesta = await _httpClient.GetAsync(ENDPOINT + $"/obtener?id={id}");
			respuesta.StatusCode.Should().Be(HttpStatusCode.OK);
			return await respuesta.Content.ReadAsAsync<ReservaDetalleDTO>();
		}

		public async Task<HttpResponseMessage> ListarPasajeros()
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
			
			//Esto es raro
			var huespedesDtos = await (await _httpClient.GetAsync(ENDPOINT_PASAJEROS)).Content
				.ReadAsAsync<IEnumerable<PasajeroDTO>>();

			return huespedesDtos.First().Id;
		}

		public async Task<int> HacerCheckIn(HacerCheckInDTO dto)
		{
			var respuesta = await _httpClient.PostAsJsonAsync(ENDPOINT + "/hacerCheckIn", dto);
			respuesta.StatusCode.Should().Be(HttpStatusCode.OK);
			return await respuesta.Content.ReadAsAsync<int>();
		}

		public async Task<int> Cancelar(CancelarDTO dto)
		{
			var respuesta = await _httpClient.PostAsJsonAsync(ENDPOINT + "/cancelar", dto);
			respuesta.StatusCode.Should().Be(HttpStatusCode.OK);
			return await respuesta.Content.ReadAsAsync<int>();
		}

		public async Task<int> HacerCheckOut(HacerCheckOutDTO dto)
		{
			var respuesta = await _httpClient.PostAsJsonAsync(ENDPOINT + "/hacerCheckOut", dto);
			respuesta.StatusCode.Should().Be(HttpStatusCode.OK);
			return await respuesta.Content.ReadAsAsync<int>();
		}
	}
}