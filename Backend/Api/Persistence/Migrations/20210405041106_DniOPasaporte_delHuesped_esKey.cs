using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class DniOPasaporte_delHuesped_esKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Huespedes_DniOPasaporte",
                table: "Huespedes",
                column: "DniOPasaporte",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Huespedes_DniOPasaporte",
                table: "Huespedes");
        }
    }
}
