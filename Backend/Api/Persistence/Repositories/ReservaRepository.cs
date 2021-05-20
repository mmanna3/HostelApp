using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Core.Entidades;
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
        public async Task<IEnumerable<Reserva>> ListarEntre(DateTime primeraNoche, DateTime ultimaNoche)
        {
            return await _context.Reservas
	            .Include(x => x.Huesped)
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
							.Include(x => x.Huesped)

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
