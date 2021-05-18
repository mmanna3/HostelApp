using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core;
using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Core.Services;
using Api.Core.Services.Interfaces;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests.Services
{
    public class HabitacionServiceTests
    {
        private IHabitacionService _service;

        private Mock<IHabitacionRepository> _mockRepo;
        private Mock<IUnitOfWork> _mockUnitOfWork;

        private const string TODAS_LAS_CAMAS_DEBEN_TENER_IDENTIFICADOR = "Todas las camas deben tener Identificador";
        private const string NO_PUEDE_HABER_CAMAS_CON_EL_MISMO_IDENTIFICADOR = "No puede haber camas con el mismo Identificador";

        [SetUp]
        public void Inicializar()
        {
            _mockRepo = new Mock<IHabitacionRepository>();
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _service = new HabitacionService(_mockRepo.Object, _mockUnitOfWork.Object);
        }

        [Test]
        public void Crear_Falla_PorqueHayCamasIndividualesSinNombre()
        {
            var habitacion = new HabitacionCompartida
            {
                CamasIndividuales = new List<CamaIndividual>
                {
                    new CamaIndividual { Nombre = "Individual1" },
                    new CamaIndividual { Nombre = "" },
                }
            };

            Assert.That(() => _service.CrearAsync(habitacion),
                Throws.Exception
                    .TypeOf<AppException>()
                    .With.Property("Message").EqualTo(TODAS_LAS_CAMAS_DEBEN_TENER_IDENTIFICADOR))
                ;
        }

        [Test]
        public void Crear_DaExcepcion_PorqueHayCamasMatrimonialesSinNombre()
        {
            var habitacion = new HabitacionCompartida
            {
                CamasMatrimoniales = new List<CamaMatrimonial>
                {
                    new CamaMatrimonial { Nombre = "Matrimonial1" },
                    new CamaMatrimonial { Nombre = "" },
                }
            };

            Assert.That(() => _service.CrearAsync(habitacion),
                    Throws.Exception
                        .TypeOf<AppException>()
                        .With.Property("Message").EqualTo(TODAS_LAS_CAMAS_DEBEN_TENER_IDENTIFICADOR))
                ;
        }

        [Test]
        public void Crear_Falla_PorqueHayCamasCuchetasSinNombre()
        {
            var habitacion = new HabitacionCompartida
            {
                CamasCuchetas = new List<CamaCucheta>
                {
                    new CamaCucheta
                    {
                        Abajo = new CamaCuchetaDeAbajo {Nombre = "Abajo"},
                        Arriba = new CamaCuchetaDeArriba {Nombre = "Arriba"}
                    },
                    new CamaCucheta
                    {
                        Abajo = new CamaCuchetaDeAbajo {Nombre = "Abajo1"},
                        Arriba = new CamaCuchetaDeArriba {Nombre = ""}
                    }
                }
            };

            Assert.That(() => _service.CrearAsync(habitacion),
                    Throws.Exception
                        .TypeOf<AppException>()
                        .With.Property("Message").EqualTo(TODAS_LAS_CAMAS_DEBEN_TENER_IDENTIFICADOR))
                ;

            var habitacion2 = new HabitacionCompartida
            {
                CamasCuchetas = new List<CamaCucheta>
                {
                    new CamaCucheta
                    {
                        Abajo = new CamaCuchetaDeAbajo {Nombre = ""},
                        Arriba = new CamaCuchetaDeArriba {Nombre = "Arriba"}
                    },
                    new CamaCucheta
                    {
                        Abajo = new CamaCuchetaDeAbajo {Nombre = "Abajo1"},
                        Arriba = new CamaCuchetaDeArriba {Nombre = "Arri"}
                    }
                }
            };

            Assert.That(() => _service.CrearAsync(habitacion2),
                    Throws.Exception
                        .TypeOf<AppException>()
                        .With.Property("Message").EqualTo(TODAS_LAS_CAMAS_DEBEN_TENER_IDENTIFICADOR))
                ;

            var habitacion3 = new HabitacionCompartida
            {
                CamasCuchetas = new List<CamaCucheta>
                {
                    new CamaCucheta
                    {
                        Abajo = new CamaCuchetaDeAbajo {Nombre = ""},
                        Arriba = new CamaCuchetaDeArriba {Nombre = ""}
                    },
                    new CamaCucheta
                    {
                        Abajo = new CamaCuchetaDeAbajo {Nombre = "Abajo1"},
                        Arriba = new CamaCuchetaDeArriba {Nombre = "Arri"}
                    }
                }
            };

            Assert.That(() => _service.CrearAsync(habitacion3),
                    Throws.Exception
                        .TypeOf<AppException>()
                        .With.Property("Message").EqualTo(TODAS_LAS_CAMAS_DEBEN_TENER_IDENTIFICADOR))
                ;
        }

        [Test]
        public void Crear_Falla_PorqueHayCamasDelMismoTipoConIdentificadorRepetido()
        {
            var habitacion = new HabitacionCompartida
            {
                CamasMatrimoniales = new List<CamaMatrimonial>
                {
                    new CamaMatrimonial { Nombre = "Matrimonial1" },
                    new CamaMatrimonial { Nombre = "Matrimonial1" },
                }
            };

            Assert.That(() => _service.CrearAsync(habitacion),
                    Throws.Exception
                        .TypeOf<AppException>()
                        .With.Property("Message").EqualTo(NO_PUEDE_HABER_CAMAS_CON_EL_MISMO_IDENTIFICADOR))
                ;
        }

        [Test]
        public void Crear_Falla_PorqueHayCamasDeDistintoTipoConIdentificadorRepetido()
        {
            var habitacion = new HabitacionCompartida
            {
                CamasIndividuales = new List<CamaIndividual>
                {
                    new CamaIndividual { Nombre = "Individual1" },
                },
                CamasCuchetas = new List<CamaCucheta>
                {
                    new CamaCucheta
                    {
                        Abajo = new CamaCuchetaDeAbajo {Nombre = "Individual1"},
                        Arriba = new CamaCuchetaDeArriba {Nombre = "111as"}
                    },
                    new CamaCucheta
                    {
                        Abajo = new CamaCuchetaDeAbajo {Nombre = "Abajo1"},
                        Arriba = new CamaCuchetaDeArriba {Nombre = "Arri"}
                    }
                }
            };

            Assert.That(() => _service.CrearAsync(habitacion),
                    Throws.Exception
                        .TypeOf<AppException>()
                        .With.Property("Message").EqualTo(NO_PUEDE_HABER_CAMAS_CON_EL_MISMO_IDENTIFICADOR))
                ;
        }

        [Test]
        public async Task Crear_Ok_PorqueTodasLasCamasTienenIdentificadorUnico()
        {
            var habitacion = new HabitacionCompartida
            {
                CamasIndividuales = new List<CamaIndividual>
                {
                    new CamaIndividual { Nombre = "Individual1" },
                },
                CamasCuchetas = new List<CamaCucheta>
                {
                    new CamaCucheta
                    {
                        Abajo = new CamaCuchetaDeAbajo {Nombre = "CuchetaAbajo"},
                        Arriba = new CamaCuchetaDeArriba {Nombre = "CuchetaArriba"}
                    }
                },
                CamasMatrimoniales = new List<CamaMatrimonial>
                {
                    new CamaMatrimonial { Nombre = "aaaaaaa"},
                }
            };

            var result = await _service.CrearAsync(habitacion);

            result.Should().BeOfType(typeof(int));
        }
    }
}