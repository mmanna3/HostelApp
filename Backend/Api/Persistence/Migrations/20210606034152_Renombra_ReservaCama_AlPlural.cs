using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class Renombra_ReservaCama_AlPlural : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservaCama_Camas_CamaId",
                table: "ReservaCama");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservaCama_Reservas_ReservaId",
                table: "ReservaCama");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReservaCama",
                table: "ReservaCama");

            migrationBuilder.RenameTable(
                name: "ReservaCama",
                newName: "ReservaCamas");

            migrationBuilder.RenameIndex(
                name: "IX_ReservaCama_CamaId",
                table: "ReservaCamas",
                newName: "IX_ReservaCamas_CamaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReservaCamas",
                table: "ReservaCamas",
                columns: new[] { "ReservaId", "CamaId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ReservaCamas_Camas_CamaId",
                table: "ReservaCamas",
                column: "CamaId",
                principalTable: "Camas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservaCamas_Reservas_ReservaId",
                table: "ReservaCamas",
                column: "ReservaId",
                principalTable: "Reservas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservaCamas_Camas_CamaId",
                table: "ReservaCamas");

            migrationBuilder.DropForeignKey(
                name: "FK_ReservaCamas_Reservas_ReservaId",
                table: "ReservaCamas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReservaCamas",
                table: "ReservaCamas");

            migrationBuilder.RenameTable(
                name: "ReservaCamas",
                newName: "ReservaCama");

            migrationBuilder.RenameIndex(
                name: "IX_ReservaCamas_CamaId",
                table: "ReservaCama",
                newName: "IX_ReservaCama_CamaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReservaCama",
                table: "ReservaCama",
                columns: new[] { "ReservaId", "CamaId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ReservaCama_Camas_CamaId",
                table: "ReservaCama",
                column: "CamaId",
                principalTable: "Camas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReservaCama_Reservas_ReservaId",
                table: "ReservaCama",
                column: "ReservaId",
                principalTable: "Reservas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
