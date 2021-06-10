using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class AgregaBooleanoEstaHabilitadaAHabitacionYACama : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EstaHabilitada",
                table: "Habitaciones",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EstaHabilitada",
                table: "Camas",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstaHabilitada",
                table: "Habitaciones");

            migrationBuilder.DropColumn(
                name: "EstaHabilitada",
                table: "Camas");
        }
    }
}
