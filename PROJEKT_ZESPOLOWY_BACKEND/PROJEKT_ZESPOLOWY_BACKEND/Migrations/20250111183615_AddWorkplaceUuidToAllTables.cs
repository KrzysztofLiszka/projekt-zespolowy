using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PROJEKT_ZESPOLOWY_BACKEND.Migrations
{
    public partial class AddWorkplaceUuidToAllTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "WorkplaceUuid",
                table: "Workplaces",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WorkplaceUuid",
                table: "Visualizations",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WorkplaceUuid",
                table: "TimeSpents",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WorkplaceUuid",
                table: "Schedules",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WorkplaceUuid",
                table: "Images",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WorkplaceUuid",
                table: "Documentations",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "WorkplaceUuid",
                table: "Assignments",
                type: "uuid",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkplaceUuid",
                table: "Workplaces");

            migrationBuilder.DropColumn(
                name: "WorkplaceUuid",
                table: "Visualizations");

            migrationBuilder.DropColumn(
                name: "WorkplaceUuid",
                table: "TimeSpents");

            migrationBuilder.DropColumn(
                name: "WorkplaceUuid",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "WorkplaceUuid",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "WorkplaceUuid",
                table: "Documentations");

            migrationBuilder.DropColumn(
                name: "WorkplaceUuid",
                table: "Assignments");
        }
    }
}
