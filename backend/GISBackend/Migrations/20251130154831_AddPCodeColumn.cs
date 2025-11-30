using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GISBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddPCodeColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PCode",
                table: "DivisionInfos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "DivisionInfos",
                keyColumn: "Id",
                keyValue: 1,
                column: "PCode",
                value: 10);

            migrationBuilder.UpdateData(
                table: "DivisionInfos",
                keyColumn: "Id",
                keyValue: 2,
                column: "PCode",
                value: 20);

            migrationBuilder.UpdateData(
                table: "DivisionInfos",
                keyColumn: "Id",
                keyValue: 3,
                column: "PCode",
                value: 30);

            migrationBuilder.UpdateData(
                table: "DivisionInfos",
                keyColumn: "Id",
                keyValue: 4,
                column: "PCode",
                value: 40);

            migrationBuilder.UpdateData(
                table: "DivisionInfos",
                keyColumn: "Id",
                keyValue: 5,
                column: "PCode",
                value: 45);

            migrationBuilder.UpdateData(
                table: "DivisionInfos",
                keyColumn: "Id",
                keyValue: 6,
                column: "PCode",
                value: 50);

            migrationBuilder.UpdateData(
                table: "DivisionInfos",
                keyColumn: "Id",
                keyValue: 7,
                column: "PCode",
                value: 55);

            migrationBuilder.UpdateData(
                table: "DivisionInfos",
                keyColumn: "Id",
                keyValue: 8,
                column: "PCode",
                value: 60);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PCode",
                table: "DivisionInfos");
        }
    }
}
