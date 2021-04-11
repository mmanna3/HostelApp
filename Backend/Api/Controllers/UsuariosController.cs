using System.Threading.Tasks;
using Api.Controllers.DTOs.Usuario;
using Api.Controllers.Otros;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Api.Core.Entidades;
using Api.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;


namespace Api.Controllers
{
    public class UsuariosController : ApiAutenticadoController
    {
        private readonly IUsuarioService _userService;
        private readonly IMapper _mapper;

        public UsuariosController(IUsuarioService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("autenticar")]
        public async Task<IActionResult> Autenticar([FromBody] AutenticarDTO model)
        {
            var usuario = await _userService.Autenticar(model.Username, model.Password);

            var token = _userService.ObtenerToken(usuario.Id);

            return Ok(new
            {
                Id = usuario.Id,
                Username = usuario.Username,
                FirstName = usuario.Nombre,
                LastName = usuario.Apellido,
                Token = token
            });
        }

        [AllowAnonymous]
        [HttpPost("registrar")]
        public async Task<IActionResult> Registrar([FromBody] RegistrarDTO dto)
        {
            var usuario = _mapper.Map<RegistrarDTO, Usuario>(dto);

            var result = await _userService.Crear(usuario, dto.Password);
            
            var usuarioDTO = _mapper.Map<Usuario, RegistrarDTO>(result);

            return Ok(usuarioDTO);
        }

        [HttpGet("okbro")]
        public IActionResult GetAll()
        {
            return Ok("OK bro");
        }

        //[HttpGet("{id}")]
        //public IActionResult ObtenerPorId(int id)
        //{
        //    var user = _userService.ObtenerPorId(id);
        //    var model = _mapper.Map<UserModel>(user);
        //    return Ok(model);
        //}

        //[HttpPut("{id}")]
        //public IActionResult Update(int id, [FromBody] UpdateModel model)
        //{
        //    // map model to entity and set id
        //    var user = _mapper.Map<User>(model);
        //    user.Id = id;

        //    try
        //    {
        //        // update user 
        //        _userService.Update(user, model.Password);
        //        return Ok();
        //    }
        //    catch (AppException ex)
        //    {
        //        // return error message if there was an exception
        //        return BadRequest(new { message = ex.Message });
        //    }
        //}

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    _userService.Delete(id);
        //    return Ok();
        //}
    }
}
