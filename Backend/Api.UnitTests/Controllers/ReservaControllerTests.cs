using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
using Api.Core;
using Api.Core.Models;
using Api.Core.Services.Interfaces;
using AutoMapper;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests.Controllers
{
    public class ReservaControllerTests
    {
        private ReservasController _controller;
        private Mock<IReservaService> _mockService;
        private IMapper _mapper;

        private ReservaDTO _unaReservaDto;
        private IList<Reserva> _unaListaDeReservas;
        private const string A_NOMBRE_DE = "Un nombre";
        private const int UN_CAMA_ID = 1;
        private readonly DateTime DESDE = new DateTime(2020, 07, 17);
        private readonly DateTime HASTA = new DateTime(2020, 09, 17);

        [SetUp]
        public void Inicializar()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DtoToModelTestProfile());
                cfg.AddProfile(new ModelToDtoTestProfile());
            });
            
            _mapper = new Mapper(configuration);
            _mockService = new Mock<IReservaService>();
            _controller = new ReservasController(_mapper, _mockService.Object);
        }

        [Test]
        public void MapeaCorrectamenteEnLaCreacion()
        {
            DadaUnaReservaDto();

            var reserva = _mapper.Map<Reserva>(_unaReservaDto);

            reserva.ANombreDe.Should().Be(A_NOMBRE_DE);
            reserva.PrimeraNoche.Should().Be(DESDE);
            reserva.UltimaNoche.Should().Be(HASTA.AddDays(-1));
            reserva.ReservaCamas.Should().HaveCount(4);

            reserva.ReservaCamas.Should().Contain(x => x.CamaId == UN_CAMA_ID);
            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 100);
            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 200);
            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 400);
        }

        [Test]
        public void MapeaCorrectamente_SiNoHayCamasDeHabitacionesPrivadas()
        {
            DadoUnaReservaDtoSinCamasDeHabitacionesPrivadas();

            var reserva = _mapper.Map<Reserva>(_unaReservaDto);

            reserva.ANombreDe.Should().Be(A_NOMBRE_DE);
            reserva.PrimeraNoche.Should().Be(DESDE);
            reserva.UltimaNoche.Should().Be(HASTA.AddDays(-1));
            reserva.ReservaCamas.Should().HaveCount(1);

            reserva.ReservaCamas.Should().Contain(x => x.CamaId == UN_CAMA_ID);
        }

        [Test]
        public void MapeaCorrectamente_SiSoloHayCamasDeHabitacionesPrivadas()
        {
            DadoUnaReservaDtoSoloConCamasDeHabitacionesPrivadas();

            var reserva = _mapper.Map<Reserva>(_unaReservaDto);

            reserva.ANombreDe.Should().Be(A_NOMBRE_DE);
            reserva.PrimeraNoche.Should().Be(DESDE);
            reserva.UltimaNoche.Should().Be(HASTA.AddDays(-1));
            reserva.ReservaCamas.Should().HaveCount(3);

            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 100);
            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 200);
            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 400);
        }

        [Test]
        public void MapeaCorrectamenteEnLaConsultaMensual()
        {
            DadaUnaListaDeReservas();
            var desde = new DateTime(2020, 8, 1);
            var hasta = new DateTime(2020, 8, 31);

            var reservasDTO = _mapper.Map<ReservasDelPeriodoDTO>(_unaListaDeReservas, op =>
            {
                op.Items["desde"] = desde;
                op.Items["hasta"] = hasta;
            });
            var primeraReserva = reservasDTO.Reservas.First();

            reservasDTO.Desde.Should().Be(Utilidades.ConvertirFecha(desde));
            reservasDTO.Hasta.Should().Be(Utilidades.ConvertirFecha(hasta));

            primeraReserva.DiaDeCheckin.Should().Be(1);
            primeraReserva.DiaDeCheckout.Should().Be(31);
            primeraReserva.ANombreDe.Should().Be(A_NOMBRE_DE);
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
                ANombreDe = A_NOMBRE_DE,
                ReservaCamas = new List<ReservaCama> { new ReservaCama{ Cama = cama1, CamaId = cama1.Id}, new ReservaCama{ Cama = cama2, CamaId = cama2.Id } }
            };

            var r2 = new Reserva
            {
                PrimeraNoche = DESDE,
                UltimaNoche = HASTA,
                ANombreDe = A_NOMBRE_DE,
                ReservaCamas = new List<ReservaCama> { new ReservaCama { Cama = cama1, CamaId = cama1.Id }, new ReservaCama { Cama = cama2, CamaId = cama2.Id } }
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
                ANombreDe = A_NOMBRE_DE,
                CamasIds = new List<int?>{null, UN_CAMA_ID},
                DiaDeCheckin = Utilidades.ConvertirFecha(DESDE),
                DiaDeCheckout = Utilidades.ConvertirFecha(HASTA),
                CamasDeHabitacionesPrivadasIds = camasDeHabitacionesPrivadasIds
            };
        }

        private void DadoUnaReservaDtoSinCamasDeHabitacionesPrivadas()
        {
            _unaReservaDto = new ReservaDTO
            {
                ANombreDe = A_NOMBRE_DE,
                CamasIds = new List<int?> { null, UN_CAMA_ID },
                DiaDeCheckin = Utilidades.ConvertirFecha(DESDE),
                DiaDeCheckout = Utilidades.ConvertirFecha(HASTA)
            };
        }        
        
        private void DadoUnaReservaDtoSoloConCamasDeHabitacionesPrivadas()
        {
            var listaDeCamasDeHabitacionPrivada1 = new List<int> { 100, 200 };
            var listaDeCamasDeHabitacionPrivada2 = new List<int> { 400 };

            var camasDeHabitacionesPrivadasIds = new List<List<int>>
            {
                listaDeCamasDeHabitacionPrivada1, null, listaDeCamasDeHabitacionPrivada2
            };

            _unaReservaDto = new ReservaDTO
            {
                ANombreDe = A_NOMBRE_DE,
                DiaDeCheckin = Utilidades.ConvertirFecha(DESDE),
                DiaDeCheckout = Utilidades.ConvertirFecha(HASTA),
                CamasDeHabitacionesPrivadasIds = camasDeHabitacionesPrivadasIds
            };
        }
    }
}