using Api.Core.Entidades;
using FluentAssertions;
using NUnit.Framework;

namespace Api.UnitTests.Entidades
{
    public class ReservaTests
    {
	    [Test]
        public void DadoQueNombreHuesped_TienePrimeraPalabraDe6OMenosLetras_NombreAbreviado_LaDevuelveCompleta()
        {
	        var reserva = DadaUnaReservaConHuespedDeNombre("Carlos Alberto Solari");
            reserva.ObtenerNombreAbreviadoDelHuesped().Should().Be("Carlos");

            var reserva2 = DadaUnaReservaConHuespedDeNombre("Skay Beilinson");
            reserva2.ObtenerNombreAbreviadoDelHuesped().Should().Be("Skay");
        }

        [Test]
        public void DadoQueNombreHuesped_TienePrimeraPalabraDeMasDe6Letras_NombreAbreviado_Devuelve5PrimerasLetrasY2PuntosSuspensivos()
        {
	        var reserva = DadaUnaReservaConHuespedDeNombre("Semilla Bucciarelli");
	        reserva.ObtenerNombreAbreviadoDelHuesped().Should().Be("Semil..");
        }

        private static Reserva DadaUnaReservaConHuespedDeNombre(string nombreCompleto)
        {
	        return new Reserva{Huesped = new Huesped{NombreCompleto = nombreCompleto } };
        }
    }
}