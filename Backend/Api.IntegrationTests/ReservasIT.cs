using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.DTOs.Huesped;
using Api.Controllers.DTOs.Reserva;
using Api.Core;
using Api.Core.Enums;
using FluentAssertions;
using NUnit.Framework;

namespace Api.IntegrationTests
{
	public class ReservasIT : BaseAutenticadoIT
    {
	    private const string ENDPOINT_HABITACIONES = "/api/habitaciones";

	    private const CamaTipoEnum CAMA_TIPO = CamaTipoEnum.Individual;
        private readonly DateTime _desde = new DateTime(2020, 09, 17);
        private readonly DateTime _hasta = new DateTime(2020, 09, 18);
        private readonly HuespedDTO _datosMinimosDeUnHuesped = new HuespedDTO
        {
	        NombreCompleto = "Elliot Alderson",
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
        public async Task Crea_UnaReserva_Y_ApareceEnListado()
        {

            var camaId = await CrearHabitacionConUnaCama();

            var response = await _reservasHttpClient.CrearReserva(camaId, null, _datosMinimosDeUnHuesped, _desde, _hasta);
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var consultaResponse = await _reservasHttpClient.ListarEntre(Utilidades.ConvertirFecha(_desde), 1);
            consultaResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var reservasDelMes = await consultaResponse.Content.ReadAsAsync<ReservasDelPeriodoDTO>();

            reservasDelMes.Reservas.Count().Should().Be(1);
            var reserva = reservasDelMes.Reservas.ToList().First();

            reserva.DiaDeCheckin.Should().Be("2020-09-17");
            reserva.DiaDeCheckout.Should().Be("2020-09-17");
            reserva.CamasIds.Should().HaveCount(1);
            reserva.CamasIds.First().Should().Be(camaId);
            reserva.NombreAbreviadoDelHuesped.Should().Be("Elliot");
            reserva.Estado.Should().Be(ReservaEstadoEnum.CheckinPendiente);
        }

        [Test]
        public async Task Crea_UnaReserva_Y_LaObtienePorId()
        {
	        var camaId = await CrearHabitacionConUnaCama();

	        var response = await _reservasHttpClient.CrearReserva(camaId, null, _datosMinimosDeUnHuesped, _desde, _hasta);
	        response.StatusCode.Should().Be(HttpStatusCode.OK);
	        var reservaId = await response.Content.ReadAsAsync<int>();
            
	        var consultaResponse = await _reservasHttpClient.ObtenerPorId(reservaId);
	        consultaResponse.StatusCode.Should().Be(HttpStatusCode.OK);
	        var reserva = await consultaResponse.Content.ReadAsAsync<ReservaDetalleDTO>();

	        reserva.DiaDeCheckin.Should().Be("2020-09-17");
	        reserva.DiaDeCheckout.Should().Be("2020-09-18");
	        reserva.HoraEstimadaDeLlegada.Should().Be("11:30");
	        reserva.CantidadDePasajeros.Should().Be(2);
	        reserva.Canal.Should().Be("Booking");
            reserva.Camas.Should().HaveCount(1);
            reserva.Camas.First().Id.Should().Be(camaId);
	        reserva.Estado.Should().Be(ReservaEstadoEnum.CheckinPendiente);

	        reserva.HuespedTitular.NombreCompleto = _datosMinimosDeUnHuesped.NombreCompleto;
	        reserva.HuespedTitular.Telefono = _datosMinimosDeUnHuesped.Telefono;
            reserva.HuespedTitular.Email = _datosMinimosDeUnHuesped.Email;
            reserva.HuespedTitular.DniOPasaporte = _datosMinimosDeUnHuesped.DniOPasaporte;
            reserva.HuespedTitular.Pais = _datosMinimosDeUnHuesped.Pais;

        }

        [Test]
        public async Task DadoQueElHuespedNoexistia_CreaUnaReserva_Y_SeCreaElHuesped()
        {
	        var camaId = await CrearHabitacionConUnaCama();

	        var response = await _reservasHttpClient.CrearReserva(camaId, null, _datosMinimosDeUnHuesped, DateTime.Today.AddDays(-1), DateTime.Today);
	        response.StatusCode.Should().Be(HttpStatusCode.OK);

	        var huespedesResponse = await _reservasHttpClient.ListarHuespedes();
	        huespedesResponse.StatusCode.Should().Be(HttpStatusCode.OK);
	        var huespedes = await huespedesResponse.Content.ReadAsAsync<IEnumerable<HuespedDTO>>();
	        var huesped = huespedes.First();

	        huesped.DniOPasaporte.Should().Be(_datosMinimosDeUnHuesped.DniOPasaporte);
	        huesped.Email.Should().Be(_datosMinimosDeUnHuesped.Email);
	        huesped.NombreCompleto.Should().Be(_datosMinimosDeUnHuesped.NombreCompleto);
	        huesped.Telefono.Should().Be(_datosMinimosDeUnHuesped.Telefono);
        }

        [Test]
        public async Task DadoQueElHuespedYaExistia_CreaUnaReserva_Y_SeModificaElHuesped()
        {
	        var camaId = await CrearHabitacionConUnaCama();
	        var huespedId = await _reservasHttpClient.CrearHuesped(_datosMinimosDeUnHuesped);

	        var response = await _reservasHttpClient.CrearReserva(camaId, null, _datosMinimosDeUnHuesped, DateTime.Today.AddDays(-1), DateTime.Today);
	        response.StatusCode.Should().Be(HttpStatusCode.OK);

	        var huespedesResponse = await _reservasHttpClient.ListarHuespedes();
	        huespedesResponse.StatusCode.Should().Be(HttpStatusCode.OK);
	        var huespedes = await huespedesResponse.Content.ReadAsAsync<IEnumerable<HuespedDTO>>();
	        var huesped = huespedes.Single(x => x.Id == huespedId);

	        huesped.DniOPasaporte.Should().Be(_datosMinimosDeUnHuesped.DniOPasaporte);
	        huesped.Email.Should().Be(_datosMinimosDeUnHuesped.Email);
	        huesped.NombreCompleto.Should().Be(_datosMinimosDeUnHuesped.NombreCompleto);
	        huesped.Telefono.Should().Be(_datosMinimosDeUnHuesped.Telefono);
        }

        [Test]
        public async Task Lista_Correctamente_CheckoutsDeHoy()
        {
            var camaId = await CrearHabitacionConUnaCama();

            await _reservasHttpClient.CrearReserva(camaId, null, _datosMinimosDeUnHuesped, DateTime.Today.AddDays(-3), DateTime.Today);

            var consultaResponse = await _reservasHttpClient.ListarCheckoutsDeHoy();
            consultaResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var reservasConCheckoutHoy = await consultaResponse.Content.ReadAsAsync<List<CheckoutsDeHoyDTO>>();

            reservasConCheckoutHoy.Count().Should().Be(1);
            var reserva = reservasConCheckoutHoy.ToList().First();

            //reserva.ANombreDe.Should().Be(A_NOMBRE_DE);
        }

        private async Task<int> CrearHabitacionConUnaCama()
        {
            var body = new HabitacionDTO
            {
                Nombre = "Roja",
                CamasIndividuales = new List<CamaDTO>
                {
                    new CamaDTO
                    {
                        Nombre = "Indios",
                        Tipo = CAMA_TIPO
                    }
                }
            };

            await _httpClient.PostAsJsonAsync(ENDPOINT_HABITACIONES, body);
            var habitacionesDTO = await (await _httpClient.GetAsync(ENDPOINT_HABITACIONES)).Content
                .ReadAsAsync<IEnumerable<HabitacionDTO>>();

            return habitacionesDTO.First().CamasIndividuales.First().Id;
        }
    }
}