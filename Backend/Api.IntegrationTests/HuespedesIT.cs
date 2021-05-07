using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using FluentAssertions;
using NUnit.Framework;

namespace Api.IntegrationTests
{
    public class HuespedesIT : BaseAutenticadoIT
    {
        private const string ENDPOINT = "/api/huespedes";

        [Test]
        public async Task CreaHuespedCorrectamente()
        {
            var response = await CrearUnHuesped();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            var createResponse = await response.Content.ReadAsStringAsync();
            Assert.That(int.Parse(createResponse), Is.GreaterThan(0));

            var listaResponse = await ListarHuespedes();
            listaResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var huespedes = await listaResponse.Content.ReadAsAsync<IEnumerable<HuespedDTO>>();

            huespedes.Count().Should().Be(1);
            var huesped = huespedes.ToList().First();
            huesped.NombreCompleto.Should().Be("Elliot");
        }

        private async Task<HttpResponseMessage> CrearUnHuesped()
        {
            var body = new HuespedDTO
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