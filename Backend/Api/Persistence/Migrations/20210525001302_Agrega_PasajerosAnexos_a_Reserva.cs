using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class Agrega_PasajerosAnexos_a_Reserva : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReservaPasajeroAnexo",
                columns: table => new
                {
                    ReservaId = table.Column<int>(nullable: false),
                    PasajeroId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservaPasajeroAnexo", x => new { x.ReservaId, x.PasajeroId });
                    table.ForeignKey(
                        name: "FK_ReservaPasajeroAnexo_Pasajeros_PasajeroId",
                        column: x => x.PasajeroId,
                        principalTable: "Pasajeros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReservaPasajeroAnexo_Reservas_ReservaId",
                        column: x => x.ReservaId,
                        principalTable: "Reservas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservaPasajeroAnexo_PasajeroId",
                table: "ReservaPasajeroAnexo",
                column: "PasajeroId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservaPasajeroAnexo");
        }
    }
}
