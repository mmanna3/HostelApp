using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.DTOs.Pasajero;
using Api.Core;
using FluentAssertions;
using NUnit.Framework;

namespace Api.IntegrationTests
{
	public class HabitacionesIT : BaseAutenticadoIT
    {
        private const string ENDPOINT = "/api/habitaciones";

        private const string ENDPOINT_CONLUGARESLIBRES = ENDPOINT + "/conLugaresLibres";
        private readonly DateTime DESDE = new DateTime(2020, 09, 17);
        private readonly DateTime HASTA = new DateTime(2020, 09, 18);
        private readonly PasajeroDTO _pasajero = new PasajeroDTO
        {
	        NombreCompleto = "Elliot",
	        DniOPasaporte = "123456789",
	        Email = "mrrobot@fsociety.ong",
	        Telefono = "5556453",
	        Pais = "AR",
        };

        private ReservasHttpClient _reservasHttpClient;

        protected override void EjecutarUnaSolaVez()
        {
	        _reservasHttpClient = new ReservasHttpClient(_httpClient);
        }

        [Test]
        public async Task CreaHabitacion_Compartida_Correctamente()
        {
            var response = await CrearUnaHabitacionCompartida();
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var consultarHabitacionesResponse = await ListarHabitaciones();
            consultarHabitacionesResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();

            habitaciones.Count().Should().Be(1);
            var habitacion = habitaciones.ToList().First();

            habitacion.EsPrivada.Should().BeFalse();
            habitacion.TieneBanio.Should().BeTrue();
            habitacion.InformacionAdicional.Should().Be("asd");

            habitacion.CamasMatrimoniales.Count.Should().Be(1);
            habitacion.CamasIndividuales.Count.Should().Be(1);

            habitacion.CamasCuchetas.Count.Should().Be(1);
            habitacion.CamasCuchetas.First().Abajo.Should().NotBeNull();
            habitacion.CamasCuchetas.First().Arriba.Should().NotBeNull();
        }

        [Test]
        public async Task ObtienePorIdCorrectamente()
        {
            var response = await CrearUnaHabitacionCompartida();
            var habitacionId = await response.Content.ReadAsAsync<int>();

            var obtenerPorIdResponse = await _httpClient.GetAsync($"{ENDPOINT}/obtener?id={habitacionId}");
            obtenerPorIdResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var habitacion = await obtenerPorIdResponse.Content.ReadAsAsync<HabitacionDTO>();

            habitacion.EsPrivada.Should().BeFalse();
            habitacion.TieneBanio.Should().BeTrue();
            habitacion.InformacionAdicional.Should().Be("asd");

            habitacion.CamasMatrimoniales.Count.Should().Be(1);
            habitacion.CamasIndividuales.Count.Should().Be(1);

            habitacion.CamasCuchetas.Count.Should().Be(1);
            habitacion.CamasCuchetas.First().Abajo.Should().NotBeNull();
            habitacion.CamasCuchetas.First().Arriba.Should().NotBeNull();
        }

        [Test]
        public async Task ListaConLugaresLibres_DeUnaCompartida_Correctamente()
        {
            await CrearUnaHabitacionCompartida();
            await CargarUnaReservaEnLaPrimeraCamaDeLaPrimeraHabitacion();

            var consultarHabitacionesResponse = await ListarHabitacionesConLugaresLibresEnElRango();
            var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionConLugaresLibresDTO>>();
            var habitacion = habitaciones.ToList().First();
            habitacion.CantidadDeLugaresLibres.Should().Be(4);
        }

		[Test]
		public async Task ListaConLugaresLibres_DeUnaPrivada_Correctamente()
		{
			await CrearUnaHabitacionPrivada();
			await CargarUnaReservaDeLaHabitacionPrivada();

			var consultarHabitacionesResponse = await ListarHabitacionesConLugaresLibresEnElRango();
			var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionConLugaresLibresDTO>>();
			var habitacion = habitaciones.ToList().First(x => x.EsPrivada);
			habitacion.CantidadDeLugaresLibres.Should().Be(0);

			var fueraDeRangoResponse = await ListarHabitacionesConLugaresLibresFueraDelRango();
			var habitacionesFueraDeRango = await fueraDeRangoResponse.Content.ReadAsAsync<IEnumerable<HabitacionConLugaresLibresDTO>>();
			var habitacionFueraDeRango = habitacionesFueraDeRango.ToList().First();
			habitacionFueraDeRango.CantidadDeLugaresLibres.Should().Be(5);
        }

		private async Task CargarUnaReservaEnLaPrimeraCamaDeLaPrimeraHabitacion()
        {
            var consultarHabitacionesResponse = await ListarHabitaciones();
            var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();

            var habitacion = habitaciones.ToList().First();

            var camaId = habitacion.CamasIndividuales.First().Id;

            await _reservasHttpClient.CrearReserva(camaId, null, _pasajero, DESDE, HASTA);
        }

		private async Task CargarUnaReservaDeLaHabitacionPrivada()
		{
			var consultarHabitacionesResponse = await ListarHabitaciones();
			var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();

			var habitacion = habitaciones.ToList().First(x => x.EsPrivada);

			await _reservasHttpClient.CrearReserva(null, habitacion.Id, _pasajero, DESDE, HASTA);
		}
        

        public async Task<HttpResponseMessage> CrearUnaHabitacionCompartida()
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

            return await _httpClient.PostAsJsonAsync(ENDPOINT, body);
        }

        public async Task<HttpResponseMessage> CrearUnaHabitacionPrivada()
        {
	        var body = new HabitacionDTO
	        {
		        Nombre = "Azul",
		        EsPrivada = true,
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

	        return await _httpClient.PostAsJsonAsync(ENDPOINT, body);
        }

        private async Task<HttpResponseMessage> ListarHabitaciones()
        {
            return await _httpClient.GetAsync(ENDPOINT);
        }

        private async Task<HttpResponseMessage> ListarHabitacionesConLugaresLibresEnElRango()
        {
            return await _httpClient.GetAsync($"{ENDPOINT_CONLUGARESLIBRES}?desde={Utilidades.ConvertirFecha(DESDE)}&hasta={Utilidades.ConvertirFecha(HASTA)}");
        }

        private async Task<HttpResponseMessage> ListarHabitacionesConLugaresLibresFueraDelRango()
        {
	        return await _httpClient.GetAsync($"{ENDPOINT_CONLUGARESLIBRES}?desde={Utilidades.ConvertirFecha(HASTA.AddDays(1))}&hasta={Utilidades.ConvertirFecha(HASTA.AddDays(2))}");
        }
    }
}