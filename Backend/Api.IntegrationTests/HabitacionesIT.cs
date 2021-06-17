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
        private HabitacionesHttpClient _habitacionesHttpClient;

        protected override void EjecutarUnaSolaVez()
        {
	        _reservasHttpClient = new ReservasHttpClient(_httpClient);
            _habitacionesHttpClient = new HabitacionesHttpClient(_httpClient);
        }

        [Test]
        public async Task Deshabilitar_Habitacion()
        {                        
            var idHabitacionCreada = await _habitacionesHttpClient.CrearUnaHabitacionCompartidaConUnaCamaDeCadaTipo();
            var habitaciones1 = await _habitacionesHttpClient.Listar();
            habitaciones1.First().EstaHabilitada.Should().Be(true);

            await _habitacionesHttpClient.DeshabilitarHabitacion(idHabitacionCreada);

            var habitaciones2 = await _habitacionesHttpClient.Listar();

            habitaciones2.First().Id.Should().Be(idHabitacionCreada);
            habitaciones2.First().EstaHabilitada.Should().Be(false);
        }

        [Test]
        public async Task Deshabilitar_Cama()
        {
            await _habitacionesHttpClient.CrearUnaHabitacionCompartidaConUnaCamaDeCadaTipo();
            var habitaciones1 = await _habitacionesHttpClient.Listar();            
            var camaIndividual1 = habitaciones1.First().CamasIndividuales.First();
            camaIndividual1.EstaHabilitada.Should().Be(true);

            await _habitacionesHttpClient.DeshabilitarCama(camaIndividual1.Id);

            var habitaciones2 = await _habitacionesHttpClient.Listar();
            var camaIndividual2 = habitaciones2.First().CamasIndividuales.First();
            camaIndividual2.EstaHabilitada.Should().Be(false);
        }

        [Test]
        public async Task CreaHabitacion_Compartida_Correctamente()
        {
            await _habitacionesHttpClient.CrearUnaHabitacionCompartidaConUnaCamaDeCadaTipo();

            var habitaciones = await _habitacionesHttpClient.Listar();

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
            var habitacionId = await _habitacionesHttpClient.CrearUnaHabitacionCompartidaConUnaCamaDeCadaTipo();

            var obtenerPorIdResponse = await _httpClient.GetAsync($"{ENDPOINT}/obtener?id={habitacionId}");
            obtenerPorIdResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var habitacion = await obtenerPorIdResponse.Content.ReadAsAsync<HabitacionDetalleDTO>();

            habitacion.EsPrivada.Should().BeFalse();
            habitacion.TieneBanio.Should().BeTrue();
            habitacion.InformacionAdicional.Should().Be("asd");

            habitacion.Camas.Count.Should().Be(4);
        }

        [Test]
        public async Task ListaConLugaresLibres_DeUnaCompartida_Correctamente()
        {
            await _habitacionesHttpClient.CrearUnaHabitacionCompartidaConUnaCamaDeCadaTipo();
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
            var habitaciones = await _habitacionesHttpClient.Listar();

            var habitacion = habitaciones.ToList().First();

            var camaId = habitacion.CamasIndividuales.First().Id;

            await _reservasHttpClient.CrearReserva(camaId, null, _pasajero, DESDE, HASTA);
        }

		private async Task CargarUnaReservaDeLaHabitacionPrivada()
		{
			var habitaciones = await _habitacionesHttpClient.Listar();

            var habitacion = habitaciones.ToList().First(x => x.EsPrivada);

			await _reservasHttpClient.CrearReserva(null, habitacion.Id, _pasajero, DESDE, HASTA);
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