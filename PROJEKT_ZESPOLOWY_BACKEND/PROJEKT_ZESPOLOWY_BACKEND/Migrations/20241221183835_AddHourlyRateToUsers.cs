using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PROJEKT_ZESPOLOWY_BACKEND.Migrations
{
    public partial class AddHourlyRateToUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "HourlyRate",
                table: "Users",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HourlyRate",
                table: "Users");
        }
    }
}
