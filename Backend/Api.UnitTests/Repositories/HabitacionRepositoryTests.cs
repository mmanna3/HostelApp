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
    public class HabitacionRepositoryTests : BaseRepositoryTests
    {
        private HabitacionRepository _repository;
        private readonly DateTime _primeraNoche = new(2020, 09, 03);
        private readonly DateTime _ultimaNoche = new(2020, 09, 10);

        protected override void Inicializar()
        {
            _repository = new HabitacionRepository(_context);
        }

        [Test]
        public async Task Lista_correctamente_lugares_libres_en_la_fecha()
        {
            await _context.Habitaciones.AddAsync(new HabitacionCompartida { Id = 1, Nombre = "Azul" });

            var indi = new CamaIndividual {Id = 1, Nombre = "Azul", HabitacionId = 1};
            await _context.CamasIndividuales.AddAsync(indi);


            var indi2 = new CamaIndividual { Id = 5, Nombre = "Azul", HabitacionId = 1 };
            var reserva = new Reserva { PrimeraNoche = _primeraNoche.AddDays(1), UltimaNoche = _ultimaNoche.AddDays(2), Estado = ReservaEstadoEnum.CheckinPendiente };
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

            (await _repository.ListarConCamasLibres()).First().LugaresLibresEntre(_primeraNoche, _ultimaNoche).Should().Be(5);
        }

		[Ignore("Cuando decidas optimizar, esto va a servir mucho")]
		public async Task Lista_correctamente_lugares_libres_en_la_fecha_desde_hasta()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionCompartidaConDosCamasDeCadaTipo();
			var camaIndividualReservadaId = DadoQueSeReservaUnaCamaIndividual(habitacionId, _primeraNoche, _ultimaNoche);
			var camaMatrimonialReservadaId = DadoQueSeReservaUnaCamaMatrimonial(habitacionId, _primeraNoche, _ultimaNoche);
			var camaCuchetaDeAbajoReservadaId = await DadoQueSeReservaUnaCamaCuchetaDeAbajo(habitacionId, _primeraNoche, _ultimaNoche);

			//CantidadDeLugaresLibres.Should().Be(6);
			//var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			//habitacion.CamasIndividuales.Count.Should().Be(1);
		}

		private async Task<int> DadoQueSeReservaUnaCamaMatrimonial(int habitacionId, DateTime primeraNoche, DateTime ultimaNoche)
		{
			var habitacion = _context.Habitaciones.Single(x => x.Id == habitacionId);
			var cama = habitacion.CamasMatrimoniales.First();
			await Reservar(cama, primeraNoche, ultimaNoche);
			return cama.Id;
		}

		private async Task<int> DadoQueSeReservaUnaCamaIndividual(int habitacionId, DateTime primeraNoche, DateTime ultimaNoche)
		{
			var habitacion = _context.Habitaciones.Single(x => x.Id == habitacionId);
			var cama = habitacion.CamasIndividuales.First();
			await Reservar(cama, primeraNoche, ultimaNoche);
			return cama.Id;
		}

		private async Task<int> DadoQueSeReservaUnaCamaCuchetaDeAbajo(int habitacionId, DateTime primeraNoche, DateTime ultimaNoche)
		{
			var habitacion = _context.Habitaciones.Single(x => x.Id == habitacionId);
			var cama = habitacion.CamasCuchetas.First().Abajo;
			await Reservar(cama, primeraNoche, ultimaNoche);
			return cama.Id;
		}

		private async Task Reservar(Cama cama, DateTime primeraNoche, DateTime ultimaNoche)
		{
			var reserva = new Reserva { PrimeraNoche = primeraNoche, UltimaNoche = ultimaNoche, Estado = ReservaEstadoEnum.CheckinPendiente };
			var reservasPorCama = new ReservaCama { Reserva = reserva, Cama = cama };
			reserva.ReservaCamas = new List<ReservaCama> { reservasPorCama };
			await _context.Reservas.AddAsync(reserva);
			await _context.SaveChangesAsync();
		}

		private async Task<int> DadoQueExisteUnaHabitacionCompartidaConDosCamasDeCadaTipo()
		{
			var habitacion = new HabitacionCompartida { Nombre = "Azul" };

			var indi1 = new CamaIndividual { Nombre = "Indi1", Habitacion = habitacion };
			var indi2 = new CamaIndividual { Nombre = "Indi2", Habitacion = habitacion };
			var matri1 = new CamaMatrimonial { Nombre = "Matri1", Habitacion = habitacion };
			var matri2 = new CamaMatrimonial { Nombre = "Matri2", Habitacion = habitacion };
			var cucheta1 = new CamaCucheta
			{
				Abajo = new CamaCuchetaDeAbajo { Nombre = "cuchetaAbajo1" },
				Arriba = new CamaCuchetaDeArriba { Nombre = "cuchetaAbajo1" },
				Habitacion = habitacion
			};
			var cucheta2 = new CamaCucheta
			{
				Abajo = new CamaCuchetaDeAbajo { Nombre = "cuchetaAbajo2" },
				Arriba = new CamaCuchetaDeArriba { Nombre = "cuchetaAbajo2" },
				Habitacion = habitacion
			};

			await _context.CamasIndividuales.AddAsync(indi1);
			await _context.CamasIndividuales.AddAsync(indi2);
			await _context.CamasMatrimoniales.AddAsync(matri1);
			await _context.CamasMatrimoniales.AddAsync(matri2);
			await _context.CamasCuchetas.AddAsync(cucheta1);
			await _context.CamasCuchetas.AddAsync(cucheta2);

			await _context.SaveChangesAsync();

			return habitacion.Id;
		}
	}
}