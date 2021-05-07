using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Controllers.Mapping;
using Api.Core.Entidades;
using AutoMapper;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class HuespedesController : ApiAutenticadoController
    {
        private readonly IHuespedService _service;
        private readonly IMapper _mapper;

        public HuespedesController(IMapper mapper, IHuespedService service)
        {
            _mapper = mapper;
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
	        var modelo = await _service.ObtenerPorId(id);
	        var dto = _mapper.Map<HuespedDTO>(modelo);

	        return dto;
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
            var huesped = _mapper.Map<Huesped>(dto);
            var id = await _service.CreateAsync(huesped);

            return id;
        }
    }
}
