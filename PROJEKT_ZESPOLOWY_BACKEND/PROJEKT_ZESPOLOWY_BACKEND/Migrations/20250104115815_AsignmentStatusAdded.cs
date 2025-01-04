using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PROJEKT_ZESPOLOWY_BACKEND.Migrations
{
    public partial class AsignmentStatusAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Assignments",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Assignments");
        }
    }
}
