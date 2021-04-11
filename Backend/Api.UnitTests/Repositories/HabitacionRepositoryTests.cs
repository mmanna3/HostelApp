using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Persistence.Repositories;
using FluentAssertions;
using NUnit.Framework;

namespace Api.UnitTests.Repositories
{
    public class HabitacionRepositoryTests : BaseRepositoryTests
    {
        private HabitacionRepository _repository;
        private readonly DateTime DESDE = new DateTime(2020, 09, 03);
        private readonly DateTime HASTA = new DateTime(2020, 09, 10);

        protected override void Inicializar()
        {
            _repository = new HabitacionRepository(_context);
        }

        [Test]
        public async Task Lista_correctamente_lugares_libres_en_la_fecha()
        {
            await _context.Habitaciones.AddAsync(new Habitacion { Id = 1, Nombre = "Azul" });

            var indi = new CamaIndividual {Id = 1, Nombre = "Azul", HabitacionId = 1};
            await _context.CamasIndividuales.AddAsync(indi);


            var indi2 = new CamaIndividual { Id = 5, Nombre = "Azul", HabitacionId = 1 };
            var reserva = new Reserva {PrimeraNoche = DESDE.AddDays(1), UltimaNoche = HASTA.AddDays(2)};
            var reservasPorCama = new ReservaCama {Reserva = reserva, Cama = indi2};
            reserva.ReservaCamas = new List<ReservaCama> {reservasPorCama};
            await _context.Reservas.AddAsync(reserva);

            var matri = new CamaMatrimonial { Id = 2, Nombre = "Azul", HabitacionId = 1 };
            await _context.CamasMatrimoniales.AddAsync(matri);

            var cucheaba = new CamaCuchetaDeAbajo { Id = 3, Nombre = "Azul" };
            var cuchearri = new CamaCuchetaDeArriba { Id = 4, Nombre = "Azul" };


            var cuche = new CamaCucheta { Id = 1, Abajo = cucheaba, Arriba = cuchearri, HabitacionId = 1};
            await _context.CamasCuchetas.AddAsync(cuche);

            await _context.SaveChangesAsync();

            (await _repository.ListarConCamasLibres()).First().LugaresLibresEntre(DESDE, HASTA).Should().Be(5);
        }
    }
}