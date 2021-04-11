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
        public override async Task<IEnumerable<Reserva>> Listar()
        {
            return await _context.Reservas
                .Include(x => x.ReservaCamas)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reserva>> ListarMensuales(int anio, int mes)
        {
            return await _context.Reservas
                .Include(x => x.ReservaCamas)
                .ThenInclude(x => x.Cama)
                .Where(x => x.PrimeraNoche <= new DateTime(anio, mes, DateTime.DaysInMonth(anio, mes)) && x.UltimaNoche >= new DateTime(anio, mes, 1))
                .ToListAsync();
        }

        public async Task<IEnumerable<Reserva>> ListarActuales()
        {
            return await _context.Reservas
                .Include(x => x.ReservaCamas)
                .ThenInclude(x => x.Cama)
                .Where(x => x.PrimeraNoche <= DateTime.Today.AddDays(15) && x.UltimaNoche >= DateTime.Today.AddDays(-1))
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
	        return await _context.Set<Reserva>().Include(x => x.Huesped).SingleOrDefaultAsync(x => x.Id == id);
        }
    }
}
