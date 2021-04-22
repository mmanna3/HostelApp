using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
using Api.Core;
using Api.Core.Entidades;
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
        private Mock<IHuespedService> _mockHuespedService;
        private IMapper _mapper;

        private ReservaDTO _unaReservaDto;
        private IList<Reserva> _unaListaDeReservas;
        private readonly DatosMinimosDeHuespedDTO _datosMinimosDeUnHuesped = new DatosMinimosDeHuespedDTO
        {
	        NombreCompleto = "Elliot",
	        DniOPasaporte = "123456789",
	        Email = "mrrobot@fsociety.ong",
	        Telefono = "5556453",
        };
        private const int UN_CAMA_ID = 1;
        private readonly DateTime _desde = new DateTime(2020, 07, 17);
        private readonly DateTime _hasta = new DateTime(2020, 09, 17);

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
            _mockHuespedService = new Mock<IHuespedService>();
            _controller = new ReservasController(_mapper, _mockService.Object, _mockHuespedService.Object);
        }

        [Test]
        public void MapeaCorrectamenteEnLaCreacion()
        {
            DadaUnaReservaDto();

            var reserva = _mapper.Map<Reserva>(_unaReservaDto);

            reserva.Huesped.NombreCompleto.Should().Be(_datosMinimosDeUnHuesped.NombreCompleto);
            reserva.Huesped.DniOPasaporte.Should().Be(_datosMinimosDeUnHuesped.DniOPasaporte);
            reserva.Huesped.Email.Should().Be(_datosMinimosDeUnHuesped.Email);
            reserva.Huesped.Telefono.Should().Be(_datosMinimosDeUnHuesped.Telefono);

            reserva.PrimeraNoche.Should().Be(_desde);
            reserva.UltimaNoche.Should().Be(_hasta.AddDays(-1));
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

            reserva.Huesped.NombreCompleto.Should().Be(_datosMinimosDeUnHuesped.NombreCompleto);
            reserva.PrimeraNoche.Should().Be(_desde);
            reserva.UltimaNoche.Should().Be(_hasta.AddDays(-1));
            reserva.ReservaCamas.Should().HaveCount(1);

            reserva.ReservaCamas.Should().Contain(x => x.CamaId == UN_CAMA_ID);
        }

        [Test]
        public void MapeaCorrectamente_SiSoloHayCamasDeHabitacionesPrivadas()
        {
            DadoUnaReservaDtoSoloConCamasDeHabitacionesPrivadas();

            var reserva = _mapper.Map<Reserva>(_unaReservaDto);

            reserva.Huesped.NombreCompleto.Should().Be(_datosMinimosDeUnHuesped.NombreCompleto);
            reserva.PrimeraNoche.Should().Be(_desde);
            reserva.UltimaNoche.Should().Be(_hasta.AddDays(-1));
            reserva.ReservaCamas.Should().HaveCount(3);

            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 100);
            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 200);
            reserva.ReservaCamas.Should().Contain(x => x.CamaId == 400);
        }

        [Test]
        public void MapeaCorrectamente_EnObtenerPorId()
        {
	        DadaUnaListaDeReservas();
                        
	        var reservaDTO = _mapper.Map<ReservaDTO>(_unaListaDeReservas.Skip(1).First());
	        reservaDTO.DiaDeCheckin.Should().Be(Utilidades.ConvertirFecha(_desde));
	        reservaDTO.DiaDeCheckout.Should().Be(Utilidades.ConvertirFecha(_hasta));
	        reservaDTO.CamasIds.Should().HaveCount(2);
	        reservaDTO.CamasIds.First().Should().Be(1);
	        reservaDTO.CamasIds.Skip(1).First().Should().Be(2);
        }

        [Test]
        public void MapeaCorrectamenteEnLaConsulta()
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

            primeraReserva.DiaDeCheckin.Should().Be("2020-08-01");
            primeraReserva.DiaDeCheckout.Should().Be("2020-08-31");
            primeraReserva.CamasIds.Should().HaveCount(2);
            primeraReserva.CamasIds.First().Should().Be(1);
            primeraReserva.CamasIds.Skip(1).First().Should().Be(2);
        }

        [Test]
        public void MapeaCorrectamenteElHuesped_DeModelADTO()
        {
	        var reserva = new Reserva
	        {
		        PrimeraNoche = new DateTime(2020, 07, 17),
		        UltimaNoche = new DateTime(2021, 1, 2),
		        ReservaCamas = new List<ReservaCama>(),
		        Huesped = new Huesped
		        {
			        NombreCompleto = _datosMinimosDeUnHuesped.NombreCompleto, 
			        DniOPasaporte = _datosMinimosDeUnHuesped.DniOPasaporte, 
			        Telefono = _datosMinimosDeUnHuesped.Telefono, 
			        Email = _datosMinimosDeUnHuesped.Email
		        }
            };

	        var reservaDTO = _mapper.Map<ReservaDTO>(reserva);

	        reservaDTO.DatosMinimosDeHuesped.DniOPasaporte.Should().Be(_datosMinimosDeUnHuesped.DniOPasaporte);
	        reservaDTO.DatosMinimosDeHuesped.NombreCompleto.Should().Be(_datosMinimosDeUnHuesped.NombreCompleto);
	        reservaDTO.DatosMinimosDeHuesped.Email.Should().Be(_datosMinimosDeUnHuesped.Email);
	        reservaDTO.DatosMinimosDeHuesped.Telefono.Should().Be(_datosMinimosDeUnHuesped.Telefono);
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
                Huesped = new Huesped { NombreCompleto = _datosMinimosDeUnHuesped.NombreCompleto }
            };

            var r2 = new Reserva
            {
                PrimeraNoche = _desde,
                UltimaNoche = _hasta,
                ReservaCamas = new List<ReservaCama> { new ReservaCama { Cama = cama1, CamaId = cama1.Id }, new ReservaCama { Cama = cama2, CamaId = cama2.Id } },
                Huesped = new Huesped { NombreCompleto = _datosMinimosDeUnHuesped.NombreCompleto }
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
                CamasIds = new List<int?>{null, UN_CAMA_ID},
                DiaDeCheckin = Utilidades.ConvertirFecha(_desde),
                DiaDeCheckout = Utilidades.ConvertirFecha(_hasta),
                CamasDeHabitacionesPrivadasIds = camasDeHabitacionesPrivadasIds
            };
        }

        private void DadoUnaReservaDtoSinCamasDeHabitacionesPrivadas()
        {
            _unaReservaDto = new ReservaDTO
            {
	            DatosMinimosDeHuesped = _datosMinimosDeUnHuesped,
                CamasIds = new List<int?> { null, UN_CAMA_ID },
                DiaDeCheckin = Utilidades.ConvertirFecha(_desde),
                DiaDeCheckout = Utilidades.ConvertirFecha(_hasta)
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
	            DatosMinimosDeHuesped = _datosMinimosDeUnHuesped,
                DiaDeCheckin = Utilidades.ConvertirFecha(_desde),
                DiaDeCheckout = Utilidades.ConvertirFecha(_hasta),
                CamasDeHabitacionesPrivadasIds = camasDeHabitacionesPrivadasIds
            };
        }
    }
}