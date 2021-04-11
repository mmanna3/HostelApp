using System.Collections.Generic;
using Api.Core;
using Api.Core.Entidades;
using Api.Core.Repositories;
using Api.Core.Services;
using Api.Core.Services.Interfaces;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests.Services
{
    public class ReservaServiceTests
    {
        private IReservaService _service;

        private Mock<IReservaRepository> _mockRepo;
        private Mock<IUnitOfWork> _mockUnitOfWork;

        [SetUp]
        public void Inicializar()
        {
            _mockRepo = new Mock<IReservaRepository>();
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _service = new ReservaService(_mockRepo.Object, _mockUnitOfWork.Object);
        }

        [Test]
        public void Crear_Falla_PorqueHayCamasRepetidas()
        {
            var habitacion = new Reserva
            {
                ReservaCamas = new List<ReservaCama>
                {
                    new ReservaCama { CamaId = 1 },
                    new ReservaCama { CamaId = 1 },
                }
            };

            Assert.That(() => _service.Crear(habitacion),
                Throws.Exception
                    .TypeOf<AppException>()
                    .With.Property("Message").EqualTo("No puede reservarse dos veces la misma cama"))
                ;
        }
    }
}