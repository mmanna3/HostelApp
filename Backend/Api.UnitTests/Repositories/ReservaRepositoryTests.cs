using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Enums;
using Api.Persistence.Repositories;
using FluentAssertions;
using NUnit.Framework;

namespace Api.UnitTests.Repositories
{
    public class ReservaRepositoryTests : BaseRepositoryTests
    {
        private ReservaRepository _repository;
        private readonly DateTime _desde = new DateTime(2020, 09, 17);
        private readonly DateTime _hasta = new DateTime(2020, 09, 17);
        private readonly Pasajero _pasajero = new Pasajero
        {
            NombreCompleto = "Elliot",
            DniOPasaporte = "123456789",
            Email = "mrrobot@fsociety.ong",
            Telefono = "5556453",
            Id = 1,
        };

        protected override void Inicializar()
        {
            _repository = new ReservaRepository(_context);
        }

        [Ignore("")]
        public void Lista_correctamente_lugares_libres_en_la_fecha()
        {
            _context.Habitaciones.Add(new HabitacionCompartida { Id = 1, Nombre = "Azul" });

            var cama = new CamaIndividual {Id = 1, Nombre = "Azul", HabitacionId = 1};
            _context.CamasIndividuales.Add(cama);
            
            var reserva = new Reserva {Id = 1, PasajeroTitular = _pasajero, PrimeraNoche = _desde, UltimaNoche = _hasta};
            _context.Reservas.Add(reserva);

            //_context.ReservasDeCamas.Add(new ReservaCama {Cama = cama, Reserva = reserva});

            _context.SaveChanges();



            //_context.ReservasDeCamas.Should().HaveCount(1);
        }

        [Test]
        public async Task ObtenerPorId_Devuelve_ElPasajero()
        {
	        var reservaId = AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 09, 17), new DateTime(2020, 10, 17));
	        var reserva = await _repository.ObtenerPorId(reservaId);

	        reserva.PasajeroTitular.DniOPasaporte.Should().Be(_pasajero.DniOPasaporte);
	        reserva.PasajeroTitular.NombreCompleto.Should().Be(_pasajero.NombreCompleto);
	        reserva.PasajeroTitular.Email.Should().Be(_pasajero.Email);
	        reserva.PasajeroTitular.Telefono.Should().Be(_pasajero.Telefono);
        }

        [Test]
        public async Task Listar_FiltraCorrectamenteCheckOutsDeHoy()
        {
	        var hoy = new DateTime(2020, 10, 18);

            AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 10, 15), new DateTime(2020, 10, 16), ReservaEstadoEnum.InHouse);
            AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 10, 16), new DateTime(2020, 10, 17), ReservaEstadoEnum.InHouse);
            AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 10, 17), hoy, ReservaEstadoEnum.InHouse);
            var listado = await _repository.Listar(ReservaEstadoEnum.InHouse, null, null, hoy, hoy);

	        listado.Count().Should().Be(1);
        }

        [Test]
        public async Task Listar_FiltraCorrectamenteCheckInsDeHoy()
        {
	        var hoy = new DateTime(2020, 10, 18);

	        AgregarReservaDeUnaCamaParaLaFecha(hoy, new DateTime(2020, 10, 19));
            AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 10, 17), new DateTime(2020, 10, 19));
	        AgregarReservaDeUnaCamaParaLaFecha(hoy, hoy);
	        AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 10, 19), new DateTime(2020, 10, 20));
	        var listado = await _repository.Listar(ReservaEstadoEnum.CheckinPendiente, hoy, hoy, null, null);

	        listado.Count().Should().Be(2);
        }

        [Test]
        public async Task ListarVigentes_ListaSiReservaTerminaDiaInicial()
        {
	        AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 08, 17), new DateTime(2020, 10, 17));
	        var listado = await _repository.ListarVigentesEntre(new DateTime(2020, 10, 17), new DateTime(2020, 10, 18));

	        listado.Count().Should().Be(1);
        }

        [Test]
        public async Task ListarVigentes_ListaSiReservaEmpiezaUltimaNoche()
        {
	        AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 10, 27), new DateTime(2020, 10, 30));
	        var listado = await _repository.ListarVigentesEntre(new DateTime(2020, 10, 17), new DateTime(2020, 10, 27));

	        listado.Count().Should().Be(1);
        }

        [Test]
        public async Task ListarVigentes_ListaSiReservaEmpiezaMesAnteriorYTerminaEnElRango()
        {
	        AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 10, 27), new DateTime(2020, 11, 3));
	        var listado = await _repository.ListarVigentesEntre(new DateTime(2020, 11, 1), new DateTime(2020, 11, 1));

	        listado.Count().Should().Be(1);
        }

        [Test]
        public async Task ListarVigentes_ListaSiReservaEmpiezaAntesYTerminaDespuesDelRango()
        {
	        AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 10, 27), new DateTime(2020, 11, 3));
	        var listado = await _repository.ListarVigentesEntre(new DateTime(2020, 11, 1), new DateTime(2020, 11, 2));

	        listado.Count().Should().Be(1);
        }

        [Test]
        public async Task ListarVigentes_NoListaReservasFueraDeRango()
        {
	        AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 10, 27), new DateTime(2020, 11, 3));
	        var listado = await _repository.ListarVigentesEntre(new DateTime(2020, 10, 1), new DateTime(2020, 10, 26));
	        listado.Count().Should().Be(0);

	        AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 9, 27), new DateTime(2020, 9, 30));
	        listado = await _repository.ListarVigentesEntre(new DateTime(2020, 10, 1), new DateTime(2020, 10, 26));
            listado.Count().Should().Be(0);
        }

        [Test]
        public async Task ListarVigentes_NoListaReservaCancelada()
        {
	        AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 08, 17), new DateTime(2020, 10, 17), ReservaEstadoEnum.Cancelada);
	        var listado = await _repository.ListarVigentesEntre(new DateTime(2020, 10, 17), new DateTime(2020, 10, 18));

	        listado.Count().Should().Be(0);
        }

        private int AgregarReservaDeUnaCamaParaLaFecha(DateTime primeraNoche, DateTime ultimaNoche, ReservaEstadoEnum estado = ReservaEstadoEnum.CheckinPendiente)
        {
            var habitacion = new HabitacionCompartida {Nombre = "Azul"};
            _context.Habitaciones.Add(habitacion);

            var cama = new CamaIndividual { Nombre = "Azul", Habitacion = habitacion };
            _context.CamasIndividuales.Add(cama);

            var reserva = new Reserva { PasajeroTitular = _pasajero, PrimeraNoche = primeraNoche, UltimaNoche = ultimaNoche, Estado = estado };
            _context.Reservas.Add(reserva);

            var reservaCama = new ReservaCama { Cama = cama, Reserva = reserva };
            reserva.ReservaCamas = new List<ReservaCama> { reservaCama };
            cama.ReservaCamas = new List<ReservaCama> { reservaCama };

            _context.SaveChanges();

            return reserva.Id;
        }
    }
}