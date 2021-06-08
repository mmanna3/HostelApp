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
		public async Task Lista_correctamente_habitacionesCompartidas_conLugaresLibres()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionCompartidaConDosCamasDeCadaTipo();
			var camaIndividualReservadaId = await DadoQueSeReservaUnaCamaIndividual(habitacionId, _primeraNoche, _ultimaNoche);
			var camaMatrimonialReservadaId = await DadoQueSeReservaUnaCamaMatrimonial(habitacionId, _primeraNoche, _ultimaNoche);
			var camaCuchetaDeAbajoReservadaId = await DadoQueSeReservaUnaCamaCuchetaDeAbajo(habitacionId, _primeraNoche, _ultimaNoche);

			//CantidadDeLugaresLibres.Should().Be(6);
			var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			habitacion.CamasIndividuales.Count.Should().Be(1);
			habitacion.CamasIndividuales.First().Id.Should().NotBe(camaIndividualReservadaId);

			habitacion.CamasMatrimoniales.Count.Should().Be(1);
			habitacion.CamasMatrimoniales.First().Id.Should().NotBe(camaMatrimonialReservadaId);

			habitacion.CamasCuchetas.Count.Should().Be(2);
			habitacion.CamasCuchetas.First().Abajo.Should().BeNull();
			habitacion.CamasCuchetas.First().Arriba.Should().NotBeNull();
			habitacion.CamasCuchetas.Skip(1).First().Abajo.Id.Should().NotBe(camaCuchetaDeAbajoReservadaId);
			habitacion.CamasCuchetas.Skip(1).First().Arriba.Should().NotBeNull();
		}

		[Test]
		public async Task ListaConLugaresLibres_HabitacionPrivada_ConTodasSusCamas_PorqueEstaLibre()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionPrivadaConDosCamasDeCadaTipo();

			var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			habitacion.CamasIndividuales.Count.Should().Be(2);
			habitacion.CamasMatrimoniales.Count.Should().Be(2);
			habitacion.CamasCuchetas.Count.Should().Be(2);
		}

		[Test]
		public async Task ListaConLugaresLibres_HabitacionPrivada_SinCamas_PorqueEstaOcupada()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionPrivadaConDosCamasDeCadaTipo();
			await DadoQueSeReservaLaHabitacionPrivada(habitacionId, _primeraNoche, _ultimaNoche);

			var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			habitacion.CamasIndividuales.Count.Should().Be(0);
			habitacion.CamasMatrimoniales.Count.Should().Be(0);
			habitacion.CamasCuchetas.Count.Should().Be(0);
		}

		private async Task DadoQueSeReservaLaHabitacionPrivada(int habitacionId, DateTime primeraNoche, DateTime ultimaNoche)
		{
			var reserva = new Reserva { PrimeraNoche = primeraNoche, UltimaNoche = ultimaNoche, Estado = ReservaEstadoEnum.CheckinPendiente };
			var reservasHabitacionesPrivadas = new ReservaHabitacionPrivada { Reserva = reserva, HabitacionPrivadaId = habitacionId };
			reserva.ReservaHabitacionesPrivadas = new List<ReservaHabitacionPrivada> { reservasHabitacionesPrivadas };
			await _context.Reservas.AddAsync(reserva);
			await _context.SaveChangesAsync();
		}

		private async Task<int> DadoQueExisteUnaHabitacionPrivadaConDosCamasDeCadaTipo()
		{
			var habitacion = new HabitacionPrivada { Nombre = "Azul" };

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

		[Test]
		public async Task CamaOcupada_PorqueReserva_EmpiezaAntesDePrimeraNoche_Y_TerminaAntesDeUltimaNoche()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionCompartidaConUnaCamaIndividual();
			await DadoQueSeReservaUnaCamaIndividual(habitacionId, _primeraNoche.AddDays(-1), _ultimaNoche.AddDays(-1));

			var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			habitacion.CamasIndividuales.Count.Should().Be(0);
		}

		[Test]
		public async Task CamaOcupada_PorqueReserva_EmpiezaDespuesDePrimeraNoche_Y_TerminaDespuesDeUltimaNoche()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionCompartidaConUnaCamaIndividual();
			await DadoQueSeReservaUnaCamaIndividual(habitacionId, _primeraNoche.AddDays(1), _ultimaNoche.AddDays(1));

			var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			habitacion.CamasIndividuales.Count.Should().Be(0);
		}

		[Test]
		public async Task CamaOcupada_PorqueReserva_EmpiezaEnPrimeraNoche_Y_TerminaEnUltimaNoche()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionCompartidaConUnaCamaIndividual();
			await DadoQueSeReservaUnaCamaIndividual(habitacionId, _primeraNoche, _ultimaNoche);

			var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			habitacion.CamasIndividuales.Count.Should().Be(0);
		}

		[Test]
		public async Task CamaOcupada_PorqueReserva_EmpiezaDespuesDePrimeraNoche_Y_TerminaAntesDeUltimaNoche()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionCompartidaConUnaCamaIndividual();
			await DadoQueSeReservaUnaCamaIndividual(habitacionId, _primeraNoche.AddDays(1), _primeraNoche.AddDays(1));

			var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			habitacion.CamasIndividuales.Count.Should().Be(0);
		}

		[Test]
		public async Task CamaLibre_PorqueReserva_EmpiezaDespuesDeUltimaNoche_Y_TerminaDespuesDeUltimaNoche()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionCompartidaConUnaCamaIndividual();
			await DadoQueSeReservaUnaCamaIndividual(habitacionId, _ultimaNoche.AddDays(1), _ultimaNoche.AddDays(2));

			var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			habitacion.CamasIndividuales.Count.Should().Be(1);
		}

		[Test]
		public async Task CamaLibre_PorqueReserva_EmpiezaAntesDePrimeraNoche_Y_TerminaAntesDePrimeraNoche()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionCompartidaConUnaCamaIndividual();
			await DadoQueSeReservaUnaCamaIndividual(habitacionId, _primeraNoche.AddDays(-2), _primeraNoche.AddDays(-1));

			var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			habitacion.CamasIndividuales.Count.Should().Be(1);
		}

		[Test]
		public async Task CamaLibre_PorqueReserva_EstaCancelada()
		{
			var habitacionId = await DadoQueExisteUnaHabitacionCompartidaConUnaCamaIndividual();
			await DadoQueSeReservaUnaCamaIndividual(habitacionId, _primeraNoche, _primeraNoche);
			await DadoQueSeCancelanTodasLasReservas();

			var habitacion = (await _repository.ListarConCamasLibresEntre(_primeraNoche, _ultimaNoche)).Single(x => x.Id == habitacionId);
			habitacion.CamasIndividuales.Count.Should().Be(1);
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

		private async Task<int> DadoQueExisteUnaHabitacionCompartidaConUnaCamaIndividual()
		{
			var habitacion = new HabitacionCompartida { Nombre = "Azul" };
			var indi1 = new CamaIndividual { Nombre = "Indi1", Habitacion = habitacion };
			
			await _context.CamasIndividuales.AddAsync(indi1);
			await _context.SaveChangesAsync();

			return habitacion.Id;
		}

		private async Task DadoQueSeCancelanTodasLasReservas()
		{
			foreach (var reserva in _context.Reservas) reserva.Estado = ReservaEstadoEnum.Cancelada;
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