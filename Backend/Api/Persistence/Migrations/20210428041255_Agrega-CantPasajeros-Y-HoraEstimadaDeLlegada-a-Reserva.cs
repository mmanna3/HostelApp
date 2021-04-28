using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class AgregaCantPasajerosYHoraEstimadaDeLlegadaaReserva : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CantidadDePasajeros",
                table: "Reservas",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "HoraEstimadaDeLlegada",
                table: "Reservas",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CantidadDePasajeros",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "HoraEstimadaDeLlegada",
                table: "Reservas");
        }
    }
}
