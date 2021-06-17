using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Entidades;

namespace Api.Core.Services.Interfaces
{
    public interface IHabitacionService
    {
        Task<IEnumerable<Habitacion>> ListarAsync();
        Task<int> CrearAsync(Habitacion category);
        Task ModificarAsync(int id, Habitacion habitacion);
        Task<Habitacion> ObtenerPorId(int id);
        Task<IEnumerable<Habitacion>> ListarConLugaresLibresEntre(DateTime primeraNoche, DateTime ultimaNoche);
		Task Deshabilitar(int id);
		Task Habilitar(int id);
		Task HabilitarCama(int id);
		Task DeshabilitarCama(int id);
	}
}
