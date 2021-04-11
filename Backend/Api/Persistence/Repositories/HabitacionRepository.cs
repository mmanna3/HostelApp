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
    public class HabitacionRepository : ABMRepository<Habitacion>, IHabitacionRepository
    {
        public HabitacionRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Habitacion>> Listar()
        {
            return await _context.Habitaciones
                                    .Include(x => x.CamasIndividuales)
                                    .Include(x => x.CamasCuchetas)
                                        .ThenInclude(x => x.Abajo)
                                    .Include(x => x.CamasCuchetas)
                                        .ThenInclude(x => x.Arriba)
                                    .Include(x => x.CamasMatrimoniales)
                                    .ToListAsync();
        }

        public override async Task<Habitacion> ObtenerPorId(int id)
        {
            return await _context.Habitaciones
                .Include(x => x.CamasIndividuales)
                .Include(x => x.CamasCuchetas)
                    .ThenInclude(x => x.Abajo)
                .Include(x => x.CamasCuchetas)
                    .ThenInclude(x => x.Arriba)
                .Include(x => x.CamasMatrimoniales)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Habitacion>> ListarConCamasLibres()
        {
            return await _context.Habitaciones
                .Include(x => x.CamasIndividuales)
                    .ThenInclude(x => x.ReservaCamas)
                    .ThenInclude(x => x.Reserva)
                .Include(x => x.CamasCuchetas)
                    .ThenInclude(x => x.Abajo)
                    .ThenInclude(x => x.ReservaCamas)
                    .ThenInclude(x => x.Reserva)
                .Include(x => x.CamasCuchetas)
                    .ThenInclude(x => x.Arriba)
                    .ThenInclude(x => x.ReservaCamas)
                    .ThenInclude(x => x.Reserva)
                .Include(x => x.CamasMatrimoniales)
                    .ThenInclude(x => x.ReservaCamas)
                    .ThenInclude(x => x.Reserva)
                .ToListAsync();
        }
    }
}
