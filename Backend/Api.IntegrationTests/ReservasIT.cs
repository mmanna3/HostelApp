using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
using Api.Core;
using Api.Core.Entidades;
using FluentAssertions;
using NUnit.Framework;

namespace Api.IntegrationTests
{
    public class ReservasIT : BaseAutenticadoIT
    {
        private const string ENDPOINT = "/api/reservas";
        private const string ENDPOINT_HABITACIONES = "/api/habitaciones";
        private const string ENDPOINT_HUESPEDES = "/api/huespedes";

        private const string CAMA_TIPO = "Individual";
        private readonly DateTime _desde = new DateTime(2020, 09, 17);
        private readonly DateTime _hasta = new DateTime(2020, 09, 18);
        private readonly DatosMinimosDeHuespedDTO _datosMinimosDeUnHuesped = new DatosMinimosDeHuespedDTO
        {
	        NombreCompleto = "Elliot Alderson",
	        DniOPasaporte = "123456789",
	        Email = "mrrobot@fsociety.ong",
	        Telefono = "5556453",
            Pais = "AR",
        };

        [Test]
        public async Task Crea_UnaReserva_Y_ApareceEnListado()
        {

            var camaId = await CrearHabitacionConUnaCama();

            var response = await CrearReserva(camaId, _desde, _hasta);
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var consultaResponse = await ListarEntre(Utilidades.ConvertirFecha(_desde), 1);
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

	        var response = await CrearReserva(camaId, _desde, _hasta);
	        response.StatusCode.Should().Be(HttpStatusCode.OK);
	        var reservaId = await response.Content.ReadAsAsync<int>();
            
	        var consultaResponse = await ObtenerPorId(reservaId);
	        consultaResponse.StatusCode.Should().Be(HttpStatusCode.OK);
	        var reserva = await consultaResponse.Content.ReadAsAsync<ReservaDTO>();

	        reserva.DiaDeCheckin.Should().Be("2020-09-17");
	        reserva.DiaDeCheckout.Should().Be("2020-09-18");
	        reserva.HoraEstimadaDeLlegada.Should().Be("11:30:00");
	        reserva.CantidadDePasajeros.Should().Be(2);
            reserva.CamasIds.Should().HaveCount(1);
            reserva.CamasIds.First().Should().Be(camaId);
	        reserva.Estado.Should().Be(ReservaEstadoEnum.CheckinPendiente);

	        reserva.DatosMinimosDeHuesped.NombreCompleto = _datosMinimosDeUnHuesped.NombreCompleto;
	        reserva.DatosMinimosDeHuesped.Telefono = _datosMinimosDeUnHuesped.Telefono;
            reserva.DatosMinimosDeHuesped.Email = _datosMinimosDeUnHuesped.Email;
            reserva.DatosMinimosDeHuesped.DniOPasaporte = _datosMinimosDeUnHuesped.DniOPasaporte;
            reserva.DatosMinimosDeHuesped.Pais = _datosMinimosDeUnHuesped.Pais;

        }

        [Test]
        public async Task DadoQueElHuespedNoexistia_CreaUnaReserva_Y_SeCreaElHuesped()
        {
	        var camaId = await CrearHabitacionConUnaCama();

	        var response = await CrearReserva(camaId, DateTime.Today.AddDays(-1), DateTime.Today);
	        response.StatusCode.Should().Be(HttpStatusCode.OK);

	        var huespedesResponse = await ListarHuespedes();
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
	        var huespedId = await CrearHuesped();

	        var response = await CrearReserva(camaId, DateTime.Today.AddDays(-1), DateTime.Today);
	        response.StatusCode.Should().Be(HttpStatusCode.OK);

	        var huespedesResponse = await ListarHuespedes();
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

            await CrearReserva(camaId, DateTime.Today.AddDays(-3), DateTime.Today);

            var consultaResponse = await ListarCheckoutsDeHoy();
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

        private async Task<int> CrearHuesped()
        {
	        var body = new HuespedDTO
	        {
		        NombreCompleto = "Juan Carlos Papafritarika",
		        DniOPasaporte = _datosMinimosDeUnHuesped.DniOPasaporte,
		        Email = _datosMinimosDeUnHuesped.Email,
		        Telefono = _datosMinimosDeUnHuesped.Telefono,
            };

	        await _httpClient.PostAsJsonAsync(ENDPOINT_HUESPEDES, body);
	        var huespedesDtos = await (await _httpClient.GetAsync(ENDPOINT_HUESPEDES)).Content
		        .ReadAsAsync<IEnumerable<HuespedDTO>>();

	        return huespedesDtos.First().Id;
        }

        private async Task<HttpResponseMessage> CrearReserva(int camaId, DateTime desde, DateTime hasta)
        {
            var body = new ReservaDTO
            {
                DatosMinimosDeHuesped = _datosMinimosDeUnHuesped,
                CamasIds = new List<int?> { camaId },
                DiaDeCheckin = Utilidades.ConvertirFecha(desde),
                DiaDeCheckout = Utilidades.ConvertirFecha(hasta),
                HoraEstimadaDeLlegada = "11:30:00",
                CantidadDePasajeros = 2,
            };

            return await _httpClient.PostAsJsonAsync(ENDPOINT, body);
        }

        private async Task<HttpResponseMessage> ListarEntre(string primeraNoche, int dias)
        {
	        return await _httpClient.GetAsync(ENDPOINT + $"?primeraNoche={primeraNoche}&dias={dias}");
        }

        private async Task<HttpResponseMessage> ObtenerPorId(int id)
        {
            return await _httpClient.GetAsync(ENDPOINT + $"/obtener?id={id}");
        }

        private async Task<HttpResponseMessage> ListarHuespedes()
        {
	        return await _httpClient.GetAsync(ENDPOINT_HUESPEDES);
        }

        private async Task<HttpResponseMessage> ListarCheckoutsDeHoy()
        {
            return await _httpClient.GetAsync(ENDPOINT + "/checkoutsDeHoy");
        }
    }
}