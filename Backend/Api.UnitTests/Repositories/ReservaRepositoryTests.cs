using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Persistence.Repositories;
using FluentAssertions;
using NUnit.Framework;

namespace Api.UnitTests.Repositories
{
    public class ReservaRepositoryTests : BaseRepositoryTests
    {
        private ReservaRepository _repository;
        private readonly DateTime DESDE = new DateTime(2020, 09, 17);
        private readonly DateTime HASTA = new DateTime(2020, 09, 17);

        protected override void Inicializar()
        {
            _repository = new ReservaRepository(_context);
        }

        [Ignore("")]
        public void Lista_correctamente_lugares_libres_en_la_fecha()
        {
            _context.Habitaciones.Add(new Habitacion { Id = 1, Nombre = "Azul" });

            var cama = new CamaIndividual {Id = 1, Nombre = "Azul", HabitacionId = 1};
            _context.CamasIndividuales.Add(cama);
            
            var reserva = new Reserva {Id = 1, ANombreDe = "Elliot", PrimeraNoche = DESDE, UltimaNoche = HASTA};
            _context.Reservas.Add(reserva);

            //_context.ReservasDeCamas.Add(new ReservaCama {Cama = cama, Reserva = reserva});

            _context.SaveChanges();



            //_context.ReservasDeCamas.Should().HaveCount(1);
        }

        [Test]
        public async Task ListarMensuales_ListaReservaQueContieneDiasDelMes_MesesConsecutivos()
        {
            var reservaId = AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 09, 17), new DateTime(2020, 10, 17));
            var listadoDeSeptiembre = await _repository.ListarMensuales(2020, 9);
            var listadoDeOctubre = await _repository.ListarMensuales(2020, 10);
            var listadoDeAgosto = await _repository.ListarMensuales(2020, 8);

            listadoDeSeptiembre.Count().Should().Be(1);
            listadoDeOctubre.Count().Should().Be(1);
            listadoDeAgosto.Count().Should().Be(0);
        }

        [Test]
        public async Task ListarActuales_ListaCorrectamenteDesdeAyerHastaDentroDe15Dias()
        {
            AgregarReservaDeUnaCamaParaLaFecha(DateTime.Today.AddDays(-3), DateTime.Today.AddDays(1));
            AgregarReservaDeUnaCamaParaLaFecha(DateTime.Today.AddDays(15), DateTime.Today.AddDays(16));
            AgregarReservaDeUnaCamaParaLaFecha(DateTime.Today.AddDays(16), DateTime.Today.AddDays(17));
            var listado = await _repository.ListarActuales();
            listado.Count().Should().Be(2);
        }

        [Test]
        public async Task ListarMensuales_ListaReservaQueContieneDiasDelMes_MesesIncluidos()
        {
            var reservaId = AgregarReservaDeUnaCamaParaLaFecha(new DateTime(2020, 08, 17), new DateTime(2020, 10, 17));
            var listadoDeSeptiembre = await _repository.ListarMensuales(2020, 9);
            var listadoDeOctubre = await _repository.ListarMensuales(2020, 10);
            var listadoDeAgosto = await _repository.ListarMensuales(2020, 8);
            var listadoDeJulio = await _repository.ListarMensuales(2020, 7);

            listadoDeSeptiembre.Count().Should().Be(1);
            listadoDeOctubre.Count().Should().Be(1);
            listadoDeAgosto.Count().Should().Be(1);
            listadoDeJulio.Count().Should().Be(0);
        }

        private int AgregarReservaDeUnaCamaParaLaFecha(DateTime desde, DateTime hasta)
        {
            var habitacion = new Habitacion {Nombre = "Azul"};
            _context.Habitaciones.Add(habitacion);

            var cama = new CamaIndividual { Nombre = "Azul", Habitacion = habitacion };
            _context.CamasIndividuales.Add(cama);

            var reserva = new Reserva { ANombreDe = "Elliot", PrimeraNoche = desde, UltimaNoche = hasta };
            _context.Reservas.Add(reserva);

            var reservaCama = new ReservaCama { Cama = cama, Reserva = reserva };
            reserva.ReservaCamas = new List<ReservaCama> { reservaCama };
            cama.ReservaCamas = new List<ReservaCama> { reservaCama };

            _context.SaveChanges();

            return reserva.Id;
        }
    }
}