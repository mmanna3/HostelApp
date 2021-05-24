using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs.Pasajero;
using FluentAssertions;
using NUnit.Framework;

namespace Api.IntegrationTests
{
	public class PasajerosIT : BaseAutenticadoIT
    {
        private const string ENDPOINT = "/api/pasajeros";

        [Test]
        public async Task CreaHuespedCorrectamente()
        {
            var response = await CrearUnPasajero();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            var createResponse = await response.Content.ReadAsStringAsync();
            Assert.That(int.Parse(createResponse), Is.GreaterThan(0));

            var listaResponse = await ListarHuespedes();
            listaResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var pasajeros = await listaResponse.Content.ReadAsAsync<IEnumerable<PasajeroDTO>>();

            pasajeros.Count().Should().Be(1);
            var pasajero = pasajeros.ToList().First();
            pasajero.NombreCompleto.Should().Be("Elliot");
        }

        private async Task<HttpResponseMessage> CrearUnPasajero()
        {
            var body = new PasajeroDTO
            {
	            NombreCompleto = "Elliot",
	            DniOPasaporte = "123456789",
	            Email = "mrrobot@fsociety.ong",
	            Telefono = "5556453",
                Pais = "AR"
            };

            return await _httpClient.PostAsJsonAsync(ENDPOINT, body);
        }

        private async Task<HttpResponseMessage> ListarHuespedes()
        {
            return await _httpClient.GetAsync(ENDPOINT);
        }
    }
}