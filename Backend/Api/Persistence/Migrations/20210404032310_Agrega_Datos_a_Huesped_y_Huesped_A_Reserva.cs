using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class Agrega_Datos_a_Huesped_y_Huesped_A_Reserva : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ANombreDe",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "Nombre",
                table: "Huespedes");

            migrationBuilder.AddColumn<int>(
                name: "HuespedId",
                table: "Reservas",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "DniOPasaporte",
                table: "Huespedes",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Huespedes",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NombreCompleto",
                table: "Huespedes",
                maxLength: 70,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Telefono",
                table: "Huespedes",
                maxLength: 35,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_HuespedId",
                table: "Reservas",
                column: "HuespedId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Huespedes_HuespedId",
                table: "Reservas",
                column: "HuespedId",
                principalTable: "Huespedes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Huespedes_HuespedId",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_HuespedId",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "HuespedId",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "DniOPasaporte",
                table: "Huespedes");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Huespedes");

            migrationBuilder.DropColumn(
                name: "NombreCompleto",
                table: "Huespedes");

            migrationBuilder.DropColumn(
                name: "Telefono",
                table: "Huespedes");

            migrationBuilder.AddColumn<string>(
                name: "ANombreDe",
                table: "Reservas",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Nombre",
                table: "Huespedes",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");
        }
    }
}
