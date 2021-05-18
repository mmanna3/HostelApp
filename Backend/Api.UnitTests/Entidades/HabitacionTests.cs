using System;
using System.Collections.Generic;
using Api.Core.Entidades;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace Api.UnitTests.Entidades
{
    public class HabitacionTests
    {
        private static readonly DateTime INICIO = new DateTime(2020, 09, 03);
        private static readonly DateTime FIN = new DateTime(2020, 09, 07);
        private HabitacionCompartida _habitacionCompartida;

        private Mock<CamaIndividual> _mockCamaIndividual;
        private Mock<CamaCuchetaDeAbajo> _mockCamaCuchetaDeAbajo;
        private Mock<CamaCuchetaDeArriba> _mockCamaCuchetaDeArriba;
        private Mock<CamaMatrimonial> _mockCamaMatrimonial;

        [SetUp]
        public void Inicializar()
        {
            _mockCamaIndividual = new Mock<CamaIndividual>();
            _mockCamaCuchetaDeAbajo = new Mock<CamaCuchetaDeAbajo>();
            _mockCamaCuchetaDeArriba = new Mock<CamaCuchetaDeArriba>();
            _mockCamaMatrimonial = new Mock<CamaMatrimonial>();

            _habitacionCompartida = new HabitacionCompartida();
        }

        [Test]
        public void SumaCorrectamente_Reservas_CamasMatrimoniales()
        {
            _mockCamaMatrimonial.Setup(x=> x.LugaresLibresEntre(INICIO, FIN)).Returns(2);
            _habitacionCompartida.CamasMatrimoniales = new List<CamaMatrimonial>{_mockCamaMatrimonial.Object};

            _habitacionCompartida.LugaresLibresEntre(INICIO, FIN).Should().Be(2);
        }

        [Test]
        public void SumaCorrectamente_Reservas_CamasIndividuales()
        {
            _mockCamaIndividual.Setup(x => x.LugaresLibresEntre(INICIO, FIN)).Returns(1);
            _habitacionCompartida.CamasIndividuales = new List<CamaIndividual> { _mockCamaIndividual.Object };

            _habitacionCompartida.LugaresLibresEntre(INICIO, FIN).Should().Be(1);
        }

        [Test]
        public void SumaCorrectamente_Reservas_CamasCuchetas()
        {
            _mockCamaCuchetaDeAbajo.Setup(x => x.LugaresLibresEntre(INICIO, FIN)).Returns(1);
            _mockCamaCuchetaDeArriba.Setup(x => x.LugaresLibresEntre(INICIO, FIN)).Returns(1);

            var camaCucheta = new CamaCucheta
            {
                Abajo = _mockCamaCuchetaDeAbajo.Object,
                Arriba = _mockCamaCuchetaDeArriba.Object
            };

            _habitacionCompartida.CamasCuchetas = new List<CamaCucheta> { camaCucheta };

            _habitacionCompartida.LugaresLibresEntre(INICIO, FIN).Should().Be(2);
        }
    }
}