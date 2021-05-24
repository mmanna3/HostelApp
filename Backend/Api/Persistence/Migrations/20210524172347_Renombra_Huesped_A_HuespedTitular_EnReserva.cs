using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class Renombra_Huesped_A_HuespedTitular_EnReserva : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "HuespedTitularId",
                table: "Reservas",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_HuespedTitularId",
                table: "Reservas",
                column: "HuespedTitularId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Huespedes_HuespedTitularId",
                table: "Reservas",
                column: "HuespedTitularId",
                principalTable: "Huespedes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Huespedes_HuespedTitularId",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_HuespedTitularId",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "HuespedTitularId",
                table: "Reservas");

            migrationBuilder.AddColumn<int>(
                name: "HuespedId",
                table: "Reservas",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
    }
}
