using System.Collections.Generic;
using System.Linq;
using Api.Controllers;
using Api.Controllers.DTOs.Habitacion;
using Api.Core.Entidades;
using Api.Core.Services.Interfaces;
using AutoMapper;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests.Controllers
{
    public class HabitacionControllerTests
    {
        private HabitacionesController _controller;
        private Mock<IHabitacionService> _mockService;
        private IMapper _mapper;

        private HabitacionDTO _unaHabitacionDTO;
        private IList<Habitacion> _unaListaDeHabitaciones;

        [SetUp]
        public void Inicializar()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DtoToModelTestProfile());
                cfg.AddProfile(new ModelToDtoTestProfile());
            });
            
            _mapper = new Mapper(configuration);
            _mockService = new Mock<IHabitacionService>();
            _controller = new HabitacionesController(_mapper, _mockService.Object);
        }

        [Test]
        public void MapeaCorrectamenteEnLaCreacion()
        {
            DadoUnHabitacionDto();

            var habitacion = _mapper.Map<Habitacion>(_unaHabitacionDTO);

            habitacion.CamasMatrimoniales.Count.Should().Be(1);
            habitacion.CamasIndividuales.Count.Should().Be(1);
            habitacion.CamasCuchetas.Count.Should().Be(1);

            habitacion.EsPrivada.Should().BeTrue();
            habitacion.TieneBanio.Should().BeTrue();
            habitacion.InformacionAdicional.Should().Be("asd");
        }

        [Test]
        public void MapeaCorrectamenteEnLaConsulta()
        {
            DadaUnaListaDeHabitaciones();

            var habitacionesDTO = _mapper.Map<IEnumerable<HabitacionDTO>>(_unaListaDeHabitaciones).ToList();

            habitacionesDTO.First().EsPrivada.Should().BeTrue();
            habitacionesDTO.First().TieneBanio.Should().BeTrue();
            habitacionesDTO.First().InformacionAdicional.Should().Be("asd");

            habitacionesDTO.First().CamasMatrimoniales.Count.Should().Be(1);
            habitacionesDTO.First().CamasIndividuales.Count.Should().Be(1);
            habitacionesDTO.First().CamasCuchetas.Count.Should().Be(1);
        }

        private void DadaUnaListaDeHabitaciones()
        {
            _unaListaDeHabitaciones = new List<Habitacion>();

            var h1 = new Habitacion
            {
                Nombre = "Azul",
                EsPrivada = true,
                TieneBanio = true,
                InformacionAdicional = "asd",
                CamasIndividuales = new List<CamaIndividual>
                {
                    new CamaIndividual
                    {
                        Nombre = "Indi"
                    }
                },
                CamasCuchetas = new List<CamaCucheta>
                {
                    new CamaCucheta
                    {
                        Abajo = new CamaCuchetaDeAbajo
                        {
                            Nombre = "Abajo"
                        },
                        Arriba = new CamaCuchetaDeArriba
                        {
                            Nombre = "Arriba"
                        }
                    }
                },
                CamasMatrimoniales = new List<CamaMatrimonial>
                {
                    new CamaMatrimonial
                    {
                        Nombre = "Matri"
                    }
                }
            };

            _unaListaDeHabitaciones.Add(h1);
        }

        private void DadoUnHabitacionDto()
        {
            _unaHabitacionDTO = new HabitacionDTO
            {
                Nombre = "Azul",
                EsPrivada = true,
                TieneBanio = true,
                InformacionAdicional = "asd",
                CamasIndividuales = new List<CamaDTO>
                {
                    new CamaDTO
                    {
                        Nombre = "Indi"
                    }
                },
                CamasCuchetas = new List<CamaCuchetaDTO>
                {
                    new CamaCuchetaDTO
                    {
                        Abajo = new CamaDTO
                        {
                            Nombre = "Abajo"
                        },
                        Arriba = new CamaDTO
                        {
                            Nombre = "Arriba"
                        }
                    }
                },
                CamasMatrimoniales = new List<CamaDTO>
                {
                    new CamaDTO
                    {
                        Nombre = "Matri"
                    }
                }
            };
        }
    }
}