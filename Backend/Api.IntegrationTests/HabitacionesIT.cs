using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
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
        private readonly DatosMinimosDeHuespedDTO _datosMinimosDeUnHuesped = new DatosMinimosDeHuespedDTO
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
        public async Task CreaHabitacionCorrectamente()
        {
            var response = await CrearUnaHabitacion();
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var consultarHabitacionesResponse = await ListarHabitaciones();
            consultarHabitacionesResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();

            habitaciones.Count().Should().Be(1);
            var habitacion = habitaciones.ToList().First();

            habitacion.EsPrivada.Should().BeTrue();
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
            var response = await CrearUnaHabitacion();
            var habitacionId = await response.Content.ReadAsAsync<int>();

            var obtenerPorIdResponse = await _httpClient.GetAsync($"{ENDPOINT}/obtener?id={habitacionId}");
            obtenerPorIdResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var habitacion = await obtenerPorIdResponse.Content.ReadAsAsync<HabitacionDTO>();

            habitacion.EsPrivada.Should().BeTrue();
            habitacion.TieneBanio.Should().BeTrue();
            habitacion.InformacionAdicional.Should().Be("asd");

            habitacion.CamasMatrimoniales.Count.Should().Be(1);
            habitacion.CamasIndividuales.Count.Should().Be(1);

            habitacion.CamasCuchetas.Count.Should().Be(1);
            habitacion.CamasCuchetas.First().Abajo.Should().NotBeNull();
            habitacion.CamasCuchetas.First().Arriba.Should().NotBeNull();
        }

        [Test]
        public async Task ListaConLugaresLibresCorrectamente()
        {
            await CrearUnaHabitacion();
            await CargarUnaReservaEnLaPrimeraCamaDeLaPrimeraHabitacion();

            var consultarHabitacionesResponse = await ListarHabitacionesConLugaresLibresEnElRango();
            var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionParaReservaDTO>>();
            var habitacion = habitaciones.ToList().First();

            habitacion.CantidadDeLugaresLibres.Should().Be(4);
        }

        private async Task CargarUnaReservaEnLaPrimeraCamaDeLaPrimeraHabitacion()
        {
            var consultarHabitacionesResponse = await ListarHabitaciones();
            var habitaciones = await consultarHabitacionesResponse.Content.ReadAsAsync<IEnumerable<HabitacionDTO>>();

            var habitacion = habitaciones.ToList().First();

            var camaId = habitacion.CamasIndividuales.First().Id;

            await _reservasHttpClient.CrearReserva(camaId, _datosMinimosDeUnHuesped, DESDE, HASTA);
        }

        public async Task<HttpResponseMessage> CrearUnaHabitacion()
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
    }
}