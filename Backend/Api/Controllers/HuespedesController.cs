using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Huesped;
using Api.Controllers.Mapping;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class HuespedesController : ApiAutenticadoController
    {
        private readonly IHuespedService _service;

        public HuespedesController(IHuespedService service)
        {
	        _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<HuespedDTO>> Listar()
        {
            var huespedes = await _service.ListAsync();
            return HuespedMapper.Map(huespedes);
        }

        [HttpGet, Route("obtener")]
        public async Task<HuespedDTO> ObtenerPorId(int id)
        {
	        var entidad = await _service.ObtenerPorId(id);
	        return HuespedMapper.Map(entidad);
        }

        [HttpGet, Route("obtenerPorDniOPasaporte")]
        public async Task<HuespedDTO> ObtenerPorDniOPasaporte(string dniOPasaporte)
        {
	        var entidad = await _service.ObtenerPorDniOPasaporte(dniOPasaporte);
	        return HuespedMapper.Map(entidad);
        }

        [HttpPost]
        public async Task<int> Crear([FromBody] HuespedDTO dto)
        {
            var entidad = HuespedMapper.Map(dto);
            var id = await _service.CreateAsync(entidad);

            return id;
        }
    }
}
