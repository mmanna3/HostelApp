using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers.DTOs.Pasajero;
using Api.Controllers.Mapping;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
	public class PasajerosController : ApiAutenticadoController
    {
        private readonly IPasajeroService _service;

        public PasajerosController(IPasajeroService service)
        {
	        _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<PasajeroDTO>> Listar()
        {
            var pasajeros = await _service.ListAsync();
            return PasajeroMapper.Map(pasajeros);
        }

        [HttpGet, Route("obtener")]
        public async Task<PasajeroDTO> ObtenerPorId(int id)
        {
	        var entidad = await _service.ObtenerPorId(id);
	        return PasajeroMapper.Map(entidad);
        }

        [HttpGet, Route("obtenerPorDniOPasaporte")]
        public async Task<PasajeroDTO> ObtenerPorDniOPasaporte(string dniOPasaporte)
        {
	        var entidad = await _service.ObtenerPorDniOPasaporte(dniOPasaporte);
	        return PasajeroMapper.Map(entidad);
        }

        [HttpPost]
        public async Task<int> Crear([FromBody] PasajeroDTO dto)
        {
            var entidad = PasajeroMapper.Map(dto);
            var id = await _service.CreateAsync(entidad);

            return id;
        }
    }
}
