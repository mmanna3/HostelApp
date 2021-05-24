using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class Renombra_Huesped_A_Pasajero : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Huespedes_HuespedTitularId",
                table: "Reservas");

            migrationBuilder.DropTable(
                name: "Huespedes");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_HuespedTitularId",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "HuespedTitularId",
                table: "Reservas");

            migrationBuilder.AddColumn<int>(
                name: "PasajeroTitularId",
                table: "Reservas",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Pasajeros",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreCompleto = table.Column<string>(maxLength: 70, nullable: false),
                    Pais = table.Column<string>(maxLength: 2, nullable: false),
                    DniOPasaporte = table.Column<string>(maxLength: 30, nullable: false),
                    Telefono = table.Column<string>(maxLength: 35, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pasajeros", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_PasajeroTitularId",
                table: "Reservas",
                column: "PasajeroTitularId");

            migrationBuilder.CreateIndex(
                name: "IX_Pasajeros_DniOPasaporte",
                table: "Pasajeros",
                column: "DniOPasaporte",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Pasajeros_PasajeroTitularId",
                table: "Reservas",
                column: "PasajeroTitularId",
                principalTable: "Pasajeros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Pasajeros_PasajeroTitularId",
                table: "Reservas");

            migrationBuilder.DropTable(
                name: "Pasajeros");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_PasajeroTitularId",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "PasajeroTitularId",
                table: "Reservas");

            migrationBuilder.AddColumn<int>(
                name: "HuespedTitularId",
                table: "Reservas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Huespedes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DniOPasaporte = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NombreCompleto = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false),
                    Pais = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Huespedes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_HuespedTitularId",
                table: "Reservas",
                column: "HuespedTitularId");

            migrationBuilder.CreateIndex(
                name: "IX_Huespedes_DniOPasaporte",
                table: "Huespedes",
                column: "DniOPasaporte",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Huespedes_HuespedTitularId",
                table: "Reservas",
                column: "HuespedTitularId",
                principalTable: "Huespedes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
