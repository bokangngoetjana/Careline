using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareLine.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedMedicalHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BloodPressure",
                table: "MedicalHistory",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Dosage",
                table: "MedicalHistory",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrescribedMeds",
                table: "MedicalHistory",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Weight",
                table: "MedicalHistory",
                type: "numeric",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BloodPressure",
                table: "MedicalHistory");

            migrationBuilder.DropColumn(
                name: "Dosage",
                table: "MedicalHistory");

            migrationBuilder.DropColumn(
                name: "PrescribedMeds",
                table: "MedicalHistory");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "MedicalHistory");
        }
    }
}
