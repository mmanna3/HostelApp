using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers.DTOs;
using Api.Controllers.Mapping;
using Api.Core;
using Api.Core.Entidades;
using FluentAssertions;
using NUnit.Framework;

namespace Api.UnitTests.Controllers.Mapping
{
    public class ReservaMappingTests
    {
	    private ReservaDTO _unaReservaDto;
        private IList<Reserva> _unaListaDeReservas;
        private readonly DatosMinimosDeHuespedDTO _datosMinimosDeUnHuesped = new DatosMinimosDeHuespedDTO
        {
	        NombreCompleto = "Elliot",
	        DniOPasaporte = "123456789",
	        Email = "mrrobot@fsociety.ong",
	        Telefono = "5556453",
            Pais = "AR",
        };

        private readonly Huesped _unHuesped = new Huesped
        {
	        NombreCompleto = "Elliot",
	        DniOPasaporte = "123456789",
	        Email = "mrrobot@fsociety.ong",
	        Telefono = "5556453",
	        Pais = "AR",
        };

        private const int UN_CAMA_ID = 1;
        private readonly DateTime _desde = new DateTime(2020, 07, 17);
        private readonly DateTime _hasta = new DateTime(2020, 09, 17);

        [Test]
        public void ReservaDto_a_Reserva()
        {
            DadaUnaReservaDto();

            var reserva = ReservaMapper.Map(_unaReservaDto);

            reserva.Huesped.NombreCompleto.Should().Be(_datosMinimosDeUnHuesped.NombreCompleto);
            reserva.Huesped.DniOPasaporte.Should().Be(_datosMinimosDeUnHuesped.DniOPasaporte);
            reserva.Huesped.Email.Should().Be(_datosMinimosDeUnHuesped.Email);
            reserva.Huesped.Telefono.Should().Be(_datosMinimosDeUnHuesped.Telefono);
            reserva.Huesped.Pais.Should().Be(_datosMinimosDeUnHuesped.Pais);

            reserva.PrimeraNoche.Should().Be(_desde);
            reserva.UltimaNoche.Should().Be(_hasta.AddDays(-1));
            reserva.HoraEstimadaDeLlegada.Should().Be(new TimeSpan(11, 0, 0));
            reserva.Estado.Should().Be(ReservaEstadoEnum.HizoCheckout);
            reserva.CantidadDePasajeros.Should().Be(3);
            reserva.ReservaCamas.Should().HaveCount(4);

            reserva.ReservaCamas.Should().Contain(x => x.CamaId == UN_CAMA_ID);
            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 100);
            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 200);
            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 400);
        }

        [Test]
        public void Reserva_a_ReservaDTO()
        {
	        DadaUnaListaDeReservas();
	        var reservaDTO = ReservaMapper.Map(_unaListaDeReservas.Skip(1).First());

	        reservaDTO.Estado.Should().Be(ReservaEstadoEnum.InHouse);
	        reservaDTO.HoraEstimadaDeLlegada.Should().Be("11:00:00");
	        reservaDTO.CantidadDePasajeros.Should().Be(1);
            reservaDTO.DiaDeCheckin.Should().Be(Utilidades.ConvertirFecha(_desde));
	        reservaDTO.DiaDeCheckout.Should().Be(Utilidades.ConvertirFecha(_hasta.AddDays(1)));
	        reservaDTO.CamasIds.Should().HaveCount(2);
	        reservaDTO.CamasIds.First().Should().Be(1);
	        reservaDTO.CamasIds.Skip(1).First().Should().Be(2);

	        reservaDTO.DatosMinimosDeHuesped.DniOPasaporte.Should().Be(_datosMinimosDeUnHuesped.DniOPasaporte);
	        reservaDTO.DatosMinimosDeHuesped.NombreCompleto.Should().Be(_datosMinimosDeUnHuesped.NombreCompleto);
	        reservaDTO.DatosMinimosDeHuesped.Email.Should().Be(_datosMinimosDeUnHuesped.Email);
	        reservaDTO.DatosMinimosDeHuesped.Telefono.Should().Be(_datosMinimosDeUnHuesped.Telefono);
	        reservaDTO.DatosMinimosDeHuesped.Pais.Should().Be(_datosMinimosDeUnHuesped.Pais);
        }

        [Test]
        public void ListaReservas_a_ReservasDelPeriodoDTO()
        {
            DadaUnaListaDeReservas();
            var desde = new DateTime(2020, 8, 1);
            var hasta = new DateTime(2020, 8, 31);

            var reservasDelPeriodoDTO = ReservaMapper.Map(_unaListaDeReservas, desde, hasta);
            var primeraReserva = reservasDelPeriodoDTO.Reservas.First();

            reservasDelPeriodoDTO.Desde.Should().Be(Utilidades.ConvertirFecha(desde));
            reservasDelPeriodoDTO.Hasta.Should().Be(Utilidades.ConvertirFecha(hasta));

            primeraReserva.DiaDeCheckin.Should().Be("2020-08-01");
            primeraReserva.DiaDeCheckout.Should().Be("2020-08-31");
            primeraReserva.CamasIds.Should().HaveCount(2);
            primeraReserva.CamasIds.First().Should().Be(1);
            primeraReserva.CamasIds.Skip(1).First().Should().Be(2);
        }

        private void DadaUnaListaDeReservas()
        {
            _unaListaDeReservas = new List<Reserva>();

            var cama1 = new CamaCuchetaDeAbajo {Id = 1, Nombre = "a"};
            var cama2 = new CamaIndividual {Id = 2, Nombre = "b"};
            
            var r1 = new Reserva
            {
                PrimeraNoche = new DateTime(2020, 07, 17),
                UltimaNoche = new DateTime(2021, 1, 2),
                ReservaCamas = new List<ReservaCama> { new ReservaCama{ Cama = cama1, CamaId = cama1.Id}, new ReservaCama{ Cama = cama2, CamaId = cama2.Id } },
                Huesped = _unHuesped
            };

            var r2 = new Reserva
            {
                PrimeraNoche = _desde,
                UltimaNoche = _hasta,
                CantidadDePasajeros = 1,
                HoraEstimadaDeLlegada = new TimeSpan(11, 0, 0),
                Estado = ReservaEstadoEnum.InHouse,
                ReservaCamas = new List<ReservaCama> { new ReservaCama { Cama = cama1, CamaId = cama1.Id }, new ReservaCama { Cama = cama2, CamaId = cama2.Id } },
                Huesped = _unHuesped
            };

            _unaListaDeReservas.Add(r1);
            _unaListaDeReservas.Add(r2);
        }

        private void DadaUnaReservaDto()
        {
            var listaDeCamasDeHabitacionPrivada1 = new List<int> {100, 200};
            var listaDeCamasDeHabitacionPrivada2 = new List<int> {400};

            var camasDeHabitacionesPrivadasIds = new List<List<int>>
            {
                listaDeCamasDeHabitacionPrivada1, null, listaDeCamasDeHabitacionPrivada2
            };

            _unaReservaDto = new ReservaDTO
            {
                DatosMinimosDeHuesped = _datosMinimosDeUnHuesped,
                DiaDeCheckin = Utilidades.ConvertirFecha(_desde),
                DiaDeCheckout = Utilidades.ConvertirFecha(_hasta),
                CamasIds = new List<int?> { null, UN_CAMA_ID },
                CamasDeHabitacionesPrivadasIds = camasDeHabitacionesPrivadasIds,
                HoraEstimadaDeLlegada = "11:00",
                Estado = ReservaEstadoEnum.HizoCheckout,
                CantidadDePasajeros = 3,
            };
        }
    }
}