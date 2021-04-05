using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Controllers.DTOs;
using Api.Core.Models;
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
            var huespedesDTO = _mapper.Map<IEnumerable<HuespedDTO>>(huespedes);

            return huespedesDTO;
        }

        [HttpGet, Route("{id}")]
        public async Task<HuespedDTO> ObtenerPorId(int id)
        {
	        var modelo = await _service.ObtenerPorId(id);
	        var dto = _mapper.Map<HuespedDTO>(modelo);

	        return dto;
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
