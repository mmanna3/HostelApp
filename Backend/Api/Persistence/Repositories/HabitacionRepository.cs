using System;
using System.Collections;
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

        public async Task<IEnumerable<Habitacion>> ListarConCamasLibresEntre(DateTime primeraNoche, DateTime ultimaNoche)
        {
	        var idsDeCamasOcupadasEnElRango =
		        _context.ReservaCamas
			        .Where(rc => rc.Reserva.Estado != ReservaEstadoEnum.Cancelada)
                    .Where(rc => rc.Reserva.PrimeraNoche <= primeraNoche && rc.Reserva.UltimaNoche >= ultimaNoche) //Después revisar esto
			        .Select (c => c.Cama.Id)
			        .ToList();

	        var habitacionesConCamasLibres = _context.HabitacionesCompartidas.Select(x =>
		        new HabitacionCompartida
		        {
					Id = x.Id,
					Nombre = x.Nombre,
					CamasIndividuales = x.CamasIndividuales.Where(c => !idsDeCamasOcupadasEnElRango.Contains(c.Id)).ToList(),
					CamasMatrimoniales = x.CamasMatrimoniales.Where(c => !idsDeCamasOcupadasEnElRango.Contains(c.Id)).ToList(),
					CamasCuchetas = x.CamasCuchetas.Select(cc => new CamaCucheta
					{
						Id = cc.Id,
						Abajo = idsDeCamasOcupadasEnElRango.Contains(cc.Abajo.Id) ? null : cc.Abajo,
						Arriba = idsDeCamasOcupadasEnElRango.Contains(cc.Arriba.Id) ? null : cc.Arriba,
                        Habitacion = x
					}).ToList()
				});

	        return await habitacionesConCamasLibres.ToListAsync();
        }

        public async Task<IEnumerable<Habitacion>> ListarConCamasLibres()
        {
	        var habitacionesCompartidas = await _context.HabitacionesCompartidas
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

	        var habitacionesPrivadas = await _context.HabitacionesPrivadas
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
                .Include(x => x.ReservaHabitacionesPrivadas)
			        .ThenInclude(x => x.Reserva)
		        .ToListAsync();

	        return habitacionesCompartidas.Concat(habitacionesPrivadas.Cast<Habitacion>()).ToList();
        }
    }
}
