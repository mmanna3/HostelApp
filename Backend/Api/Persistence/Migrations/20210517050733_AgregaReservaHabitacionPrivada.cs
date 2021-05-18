using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class AgregaReservaHabitacionPrivada : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReservaHabitacionPrivada",
                columns: table => new
                {
                    ReservaId = table.Column<int>(nullable: false),
                    HabitacionPrivadaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservaHabitacionPrivada", x => new { x.ReservaId, x.HabitacionPrivadaId });
                    table.ForeignKey(
                        name: "FK_ReservaHabitacionPrivada_Habitaciones_HabitacionPrivadaId",
                        column: x => x.HabitacionPrivadaId,
                        principalTable: "Habitaciones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservaHabitacionPrivada_Reservas_ReservaId",
                        column: x => x.ReservaId,
                        principalTable: "Reservas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservaHabitacionPrivada_HabitacionPrivadaId",
                table: "ReservaHabitacionPrivada",
                column: "HabitacionPrivadaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservaHabitacionPrivada");
        }
    }
}
