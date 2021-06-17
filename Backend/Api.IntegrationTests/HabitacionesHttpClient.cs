using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.DTOs.Pasajero;
using Api.Controllers.DTOs.Reserva;
using FluentAssertions;

namespace Api.IntegrationTests
{
	public class HabitacionesHttpClient
	{
		private const string ENDPOINT = "/api/habitaciones";
		private const string ENDPOINT_RESERVAS = "/api/reservas";		
		private readonly HttpClient _httpClient;
		public HabitacionesHttpClient(HttpClient httpClient)
		{
			_httpClient = httpClient;
		}

		public async Task<int> CrearUnaHabitacionCompartidaConUnaCamaDeCadaTipo()
		{
			var body = new HabitacionDTO
			{
				Nombre = "Azul",
				EsPrivada = false,
				TieneBanio = true,
				InformacionAdicional = "asd",
				CamasIndividuales = new List<CamaDTO>
				{
					new CamaDTO
					{
						Nombre = "Indi"
					}
				},
				CamasMatrimoniales = new List<CamaDTO>
				{
					new CamaDTO
					{
						Nombre = "Ma"
					}
				},
				CamasCuchetas = new List<CamaCuchetaDTO>
				{
					new CamaCuchetaDTO
					{
						Nombre = "Cucheta"
					}
				}
			};

			var respuesta = await _httpClient.PostAsJsonAsync(ENDPOINT, body);
			respuesta.StatusCode.Should().Be(HttpStatusCode.OK);
			return await respuesta.Content.ReadAsAsync<int>();
		}

		public async Task<IEnumerable<HabitacionDTO>> Listar()
		{
			var respuesta = await _httpClient.GetAsync(ENDPOINT);
			respuesta.StatusCode.Should().Be(HttpStatusCode.OK);
			return await respuesta.Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();
		}

		public async Task DeshabilitarHabitacion(int id)
		{
			var body = new CambiarHabilitacionDTO { Id = id };
			var respuesta = await _httpClient.PostAsJsonAsync($"{ENDPOINT}/deshabilitar", body);
			respuesta.StatusCode.Should().Be(HttpStatusCode.OK);
		}

		public async Task DeshabilitarCama(int id)
		{
			var body = new CambiarHabilitacionDTO { Id = id };
			var respuesta = await _httpClient.PostAsJsonAsync($"{ENDPOINT}/deshabilitarCama", body);
			respuesta.StatusCode.Should().Be(HttpStatusCode.OK);
		}
	}
}