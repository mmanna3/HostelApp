using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Entidades;
using Api.Core.Enums;
using Api.Core.Repositories;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistence.Repositories
{
    public class ReservaRepository : ABMRepository<Reserva>, IReservaRepository
    {
        public ReservaRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<int> ObtenerCantidadDeCheckInsDeHoy()
        {
	        return await _context.Reservas
		        .Where(x => x.Estado.Equals(ReservaEstadoEnum.CheckinPendiente))
		        .Where(x => x.PrimeraNoche == DateTime.Today)
		        .CountAsync();
        }

        public async Task<int> ObtenerCantidadDeCheckOutsDeHoy()
        {
	        var ayer = DateTime.Today.AddDays(-1);
	        return await _context.Reservas
		        .Where(x => x.Estado.Equals(ReservaEstadoEnum.InHouse))
		        .Where(x => x.UltimaNoche == ayer)
		        .CountAsync();
        }

		public async Task<IEnumerable<Reserva>> Listar(ReservaEstadoEnum? estado, DateTime? checkInDesde, DateTime? checkInHasta, DateTime? checkOutDesde, DateTime? checkOutHasta)
		{
			var ultimaNocheDesde = checkOutDesde?.AddDays(-1);
			var ultimaNocheHasta = checkOutHasta?.AddDays(-1);

			return await _context.Reservas.Include(x => x.PasajeroTitular)
				.Where(x => estado == null || x.Estado.Equals(estado))
				.Where(x => checkInDesde == null || x.PrimeraNoche >= checkInDesde)
				.Where(x => checkInHasta == null || x.PrimeraNoche <= checkInHasta)
				.Where(x => ultimaNocheDesde == null || x.UltimaNoche >= ultimaNocheDesde)
				.Where(x => ultimaNocheHasta == null || x.UltimaNoche <= ultimaNocheHasta)
				.ToListAsync();
		}

		public async Task<IEnumerable<Reserva>> ListarVigentesEntre(DateTime primeraNoche, DateTime ultimaNoche)
        {
            return await _context.Reservas
	            .Include(x => x.PasajeroTitular)
                .Include(x => x.ReservaCamas)
					.ThenInclude(x => x.Cama)
	            
	            .Include(x => x.ReservaHabitacionesPrivadas)
					.ThenInclude(x => x.HabitacionPrivada)
						.ThenInclude(x => x.CamasCuchetas)
							.ThenInclude(x => x.Abajo)
	            
	            .Include(x => x.ReservaHabitacionesPrivadas)
					.ThenInclude(x => x.HabitacionPrivada)
						.ThenInclude(x => x.CamasCuchetas)
							.ThenInclude(x => x.Arriba)
                
	            .Include(x => x.ReservaHabitacionesPrivadas)
		            .ThenInclude(x => x.HabitacionPrivada)
						.ThenInclude(x => x.CamasIndividuales)
	            
	            .Include(x => x.ReservaHabitacionesPrivadas)
					.ThenInclude(x => x.HabitacionPrivada)
						.ThenInclude(x => x.CamasMatrimoniales)
                
	            .Where(x => x.PrimeraNoche <= ultimaNoche && x.UltimaNoche >= primeraNoche)
	            .Where(x => x.Estado != ReservaEstadoEnum.Cancelada)
				.ToListAsync();
        }

        public async Task<IEnumerable<Reserva>> ListarCheckoutsDeHoy()
        {
            return await _context.Reservas
                .Include(x => x.ReservaCamas)
					.ThenInclude(x => x.Cama)
                .Where(x => x.UltimaNoche == DateTime.Today.AddDays(-1))
                .ToListAsync();
        }

        public override async Task<Reserva> ObtenerPorId(int id)
        {
	        return await _context.Set<Reserva>()
							.Include(x => x.PasajeroTitular)

							.Include(x => x.ReservaPasajerosAnexos)
								.ThenInclude(x => x.Pasajero)

							.Include(x => x.ReservaCamas)
								.ThenInclude(x => x.Cama)
									.ThenInclude(x => (x as CamaIndividual).Habitacion)

							.Include(x => x.ReservaCamas)
								.ThenInclude(x => x.Cama)
									.ThenInclude(x => (x as CamaMatrimonial).Habitacion)

							.Include(x => x.ReservaCamas)
								.ThenInclude(x => x.Cama)
									.ThenInclude(x => (x as CamaCuchetaDeAbajo).CamaCucheta)
										.ThenInclude(x => x.Habitacion)

							.Include(x => x.ReservaCamas)
								.ThenInclude(x => x.Cama)
									.ThenInclude(x => (x as CamaCuchetaDeArriba).CamaCucheta)
										.ThenInclude(x => x.Habitacion)

							.Include(x => x.ReservaHabitacionesPrivadas)
								.ThenInclude(x => x.HabitacionPrivada)
									.ThenInclude(x => x.CamasCuchetas)
										.ThenInclude(x => x.Abajo)

							.Include(x => x.ReservaHabitacionesPrivadas)
								.ThenInclude(x => x.HabitacionPrivada)
									.ThenInclude(x => x.CamasCuchetas)
										.ThenInclude(x => x.Arriba)

							.Include(x => x.ReservaHabitacionesPrivadas)
								.ThenInclude(x => x.HabitacionPrivada)
									.ThenInclude(x => x.CamasIndividuales)

							.Include(x => x.ReservaHabitacionesPrivadas)
								.ThenInclude(x => x.HabitacionPrivada)
									.ThenInclude(x => x.CamasMatrimoniales)

							.SingleOrDefaultAsync(x => x.Id == id);
        }
    }
}
