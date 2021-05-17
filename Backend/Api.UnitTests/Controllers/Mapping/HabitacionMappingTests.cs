using System.Collections.Generic;
using System.Linq;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.Mapping;
using Api.Core.Entidades;
using Api.Core.Enums;
using FluentAssertions;
using NUnit.Framework;

namespace Api.UnitTests.Controllers.Mapping
{
    public class HabitacionMappingTests
    {
	    private HabitacionDTO _unaHabitacionDTO;
        private IList<Habitacion> _unaListaDeHabitaciones;

        [Test]
        public void MapeaCorrectamenteEnLaCreacion()
        {
            DadoUnHabitacionDto();

            var habitacion = HabitacionMapper.Map(_unaHabitacionDTO);

            habitacion.CamasMatrimoniales.Count.Should().Be(1);
            habitacion.CamasIndividuales.Count.Should().Be(1);
            habitacion.CamasCuchetas.Count.Should().Be(1);

            habitacion.TieneBanio.Should().BeTrue();
            habitacion.InformacionAdicional.Should().Be("asd");
            habitacion.Tipo().Should().Be(HabitacionTipoEnum.Privada);
        }

        [Test]
        public void MapeaCorrectamenteEnLaConsulta()
        {
            DadaUnaListaDeHabitaciones();

            var habitacionesDTO = HabitacionMapper.Map(_unaListaDeHabitaciones);

            habitacionesDTO.First().EsPrivada.Should().BeTrue();
            habitacionesDTO.First().TieneBanio.Should().BeTrue();
            habitacionesDTO.First().InformacionAdicional.Should().Be("asd");
            habitacionesDTO.First().EsPrivada.Should().Be(true);

            habitacionesDTO.First().CamasMatrimoniales.Count.Should().Be(1);
            habitacionesDTO.First().CamasIndividuales.Count.Should().Be(1);
            habitacionesDTO.First().CamasCuchetas.Count.Should().Be(1);
        }

        private void DadaUnaListaDeHabitaciones()
        {
            _unaListaDeHabitaciones = new List<Habitacion>();

            var h1 = new HabitacionPrivada
            {
                Nombre = "Azul",
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