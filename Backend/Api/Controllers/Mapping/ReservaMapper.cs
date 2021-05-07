using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Core;
using Api.Core.Entidades;

namespace Api.Controllers.Mapping
{
	public static class ReservaMapper
	{
		public static ReservaDTO Map(Reserva entidad)
		{
			return new ReservaDTO
			{
				Id = entidad.Id,
				Estado = entidad.Estado,
				HoraEstimadaDeLlegada = entidad.HoraEstimadaDeLlegada.ToString(),
				CantidadDePasajeros = entidad.CantidadDePasajeros,
				DiaDeCheckout = Utilidades.ConvertirFecha(entidad.UltimaNoche.AddDays(1)),
				DiaDeCheckin = Utilidades.ConvertirFecha(entidad.PrimeraNoche),
				CamasIds = entidad.ReservaCamas.Select(x => x.CamaId).Cast<int?>().ToList(),
				DatosMinimosDeHuesped = HuespedMapper.Map(entidad.Huesped)
			};
		}
	}
}
