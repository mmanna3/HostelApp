using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class Agrega_NavigationProperty_EnCamaCucheta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CamasCuchetas_Camas_AbajoId",
                table: "CamasCuchetas");

            migrationBuilder.DropForeignKey(
                name: "FK_CamasCuchetas_Camas_ArribaId",
                table: "CamasCuchetas");

            migrationBuilder.DropIndex(
                name: "IX_CamasCuchetas_AbajoId",
                table: "CamasCuchetas");

            migrationBuilder.DropIndex(
                name: "IX_CamasCuchetas_ArribaId",
                table: "CamasCuchetas");

            migrationBuilder.AlterColumn<int>(
                name: "ArribaId",
                table: "CamasCuchetas",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AbajoId",
                table: "CamasCuchetas",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CamaCuchetaDeAbajo_CuchetaId",
                table: "Camas",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CamaCuchetaDeArriba_CuchetaId",
                table: "Camas",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Camas_CamaCuchetaDeAbajo_CuchetaId",
                table: "Camas",
                column: "CamaCuchetaDeAbajo_CuchetaId",
                unique: true,
                filter: "[CamaCuchetaDeAbajo_CuchetaId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Camas_CamaCuchetaDeArriba_CuchetaId",
                table: "Camas",
                column: "CamaCuchetaDeArriba_CuchetaId",
                unique: true,
                filter: "[CamaCuchetaDeArriba_CuchetaId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Camas_CamasCuchetas_CamaCuchetaDeAbajo_CuchetaId",
                table: "Camas",
                column: "CamaCuchetaDeAbajo_CuchetaId",
                principalTable: "CamasCuchetas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Camas_CamasCuchetas_CamaCuchetaDeArriba_CuchetaId",
                table: "Camas",
                column: "CamaCuchetaDeArriba_CuchetaId",
                principalTable: "CamasCuchetas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Camas_CamasCuchetas_CamaCuchetaDeAbajo_CuchetaId",
                table: "Camas");

            migrationBuilder.DropForeignKey(
                name: "FK_Camas_CamasCuchetas_CamaCuchetaDeArriba_CuchetaId",
                table: "Camas");

            migrationBuilder.DropIndex(
                name: "IX_Camas_CamaCuchetaDeAbajo_CuchetaId",
                table: "Camas");

            migrationBuilder.DropIndex(
                name: "IX_Camas_CamaCuchetaDeArriba_CuchetaId",
                table: "Camas");

            migrationBuilder.DropColumn(
                name: "CamaCuchetaDeAbajo_CuchetaId",
                table: "Camas");

            migrationBuilder.DropColumn(
                name: "CamaCuchetaDeArriba_CuchetaId",
                table: "Camas");

            migrationBuilder.AlterColumn<int>(
                name: "ArribaId",
                table: "CamasCuchetas",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "AbajoId",
                table: "CamasCuchetas",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_CamasCuchetas_AbajoId",
                table: "CamasCuchetas",
                column: "AbajoId");

            migrationBuilder.CreateIndex(
                name: "IX_CamasCuchetas_ArribaId",
                table: "CamasCuchetas",
                column: "ArribaId");

            migrationBuilder.AddForeignKey(
                name: "FK_CamasCuchetas_Camas_AbajoId",
                table: "CamasCuchetas",
                column: "AbajoId",
                principalTable: "Camas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CamasCuchetas_Camas_ArribaId",
                table: "CamasCuchetas",
                column: "ArribaId",
                principalTable: "Camas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
