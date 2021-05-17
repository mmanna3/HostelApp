using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class SeparaHabitacionesCompartidasDePrivadas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(      
                name: "EsPrivada",
                table: "Habitaciones");

            migrationBuilder.AddColumn<string>(
                name: "Tipo",
                table: "Habitaciones",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Precio",
                table: "Habitaciones",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tipo",
                table: "Habitaciones");

            migrationBuilder.DropColumn(
                name: "Precio",
                table: "Habitaciones");

            migrationBuilder.AddColumn<bool>(
                name: "EsPrivada",
                table: "Habitaciones",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
