using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PROJEKT_ZESPOLOWY_BACKEND.Migrations
{
    public partial class AddUserIdToAssignment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Assignments",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Assignments");
        }
    }
}
