using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareLine.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedVisitQueue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "VisitQueue",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "VisitQueue",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "VisitQueue");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "VisitQueue");
        }
    }
}
