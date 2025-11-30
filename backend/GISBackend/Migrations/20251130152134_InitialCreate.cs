using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GISBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DivisionInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Population = table.Column<string>(type: "TEXT", nullable: false),
                    Area = table.Column<string>(type: "TEXT", nullable: false),
                    Density = table.Column<string>(type: "TEXT", nullable: false),
                    Literacy = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DivisionInfos", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "DivisionInfos",
                columns: new[] { "Id", "Area", "Density", "Literacy", "Name", "Population" },
                values: new object[,]
                {
                    { 1, "13,225 km²", "688 /km²", "77.6%", "Barishal", "9,100,102" },
                    { 2, "33,909 km²", "979 /km²", "78.4%", "Chattogram", "33,202,326" },
                    { 3, "20,509 km²", "2,156 /km²", "83.6%", "Dhaka", "44,215,107" },
                    { 4, "22,284 km²", "782 /km²", "76.8%", "Khulna", "17,416,645" },
                    { 5, "10,485 km²", "1,146 /km²", "67.1%", "Mymensingh", "12,225,498" },
                    { 6, "18,153 km²", "1,121 /km²", "73.2%", "Rajshahi", "20,353,119" },
                    { 7, "16,185 km²", "1,088 /km²", "70.8%", "Rangpur", "17,610,956" },
                    { 8, "12,635 km²", "873 /km²", "76.0%", "Sylhet", "11,034,863" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DivisionInfos");
        }
    }
}
