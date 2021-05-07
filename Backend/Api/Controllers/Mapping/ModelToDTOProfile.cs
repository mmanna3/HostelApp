using Api.Controllers.DTOs.Usuario;
using AutoMapper;
using Api.Core.Entidades;

namespace Api.Controllers.Mapping
{
    public class ModelToDTOProfile : Profile
    {
        public ModelToDTOProfile()
        {
	        CreateMap<Usuario, RegistrarDTO>();
        }
    }
}
