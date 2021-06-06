using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class Renombra_ReservasHabitacionPrivada : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservaHabitacionPrivada_Habitaciones_HabitacionPrivadaId",
                table: "ReservaHabitacionPrivada");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservaHabitacionPrivada_Reservas_ReservaId",
                table: "ReservaHabitacionPrivada");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReservaHabitacionPrivada",
                table: "ReservaHabitacionPrivada");

            migrationBuilder.RenameTable(
                name: "ReservaHabitacionPrivada",
                newName: "ReservaHabitacionesPrivadas");

            migrationBuilder.RenameIndex(
                name: "IX_ReservaHabitacionPrivada_HabitacionPrivadaId",
                table: "ReservaHabitacionesPrivadas",
                newName: "IX_ReservaHabitacionesPrivadas_HabitacionPrivadaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReservaHabitacionesPrivadas",
                table: "ReservaHabitacionesPrivadas",
                columns: new[] { "ReservaId", "HabitacionPrivadaId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ReservaHabitacionesPrivadas_Habitaciones_HabitacionPrivadaId",
                table: "ReservaHabitacionesPrivadas",
                column: "HabitacionPrivadaId",
                principalTable: "Habitaciones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservaHabitacionesPrivadas_Reservas_ReservaId",
                table: "ReservaHabitacionesPrivadas",
                column: "ReservaId",
                principalTable: "Reservas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservaHabitacionesPrivadas_Habitaciones_HabitacionPrivadaId",
                table: "ReservaHabitacionesPrivadas");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservaHabitacionesPrivadas_Reservas_ReservaId",
                table: "ReservaHabitacionesPrivadas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReservaHabitacionesPrivadas",
                table: "ReservaHabitacionesPrivadas");

            migrationBuilder.RenameTable(
                name: "ReservaHabitacionesPrivadas",
                newName: "ReservaHabitacionPrivada");

            migrationBuilder.RenameIndex(
                name: "IX_ReservaHabitacionesPrivadas_HabitacionPrivadaId",
                table: "ReservaHabitacionPrivada",
                newName: "IX_ReservaHabitacionPrivada_HabitacionPrivadaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReservaHabitacionPrivada",
                table: "ReservaHabitacionPrivada",
                columns: new[] { "ReservaId", "HabitacionPrivadaId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ReservaHabitacionPrivada_Habitaciones_HabitacionPrivadaId",
                table: "ReservaHabitacionPrivada",
                column: "HabitacionPrivadaId",
                principalTable: "Habitaciones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservaHabitacionPrivada_Reservas_ReservaId",
                table: "ReservaHabitacionPrivada",
                column: "ReservaId",
                principalTable: "Reservas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
