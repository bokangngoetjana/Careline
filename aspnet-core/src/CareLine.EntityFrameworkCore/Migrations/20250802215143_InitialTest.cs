using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareLine.Migrations
{
    /// <inheritdoc />
    public partial class InitialTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserAccountId",
                table: "Staff",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UserAccountId",
                table: "Patients",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Staff_UserAccountId",
                table: "Staff",
                column: "UserAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_UserAccountId",
                table: "Patients",
                column: "UserAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_AbpUsers_UserAccountId",
                table: "Patients",
                column: "UserAccountId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Staff_AbpUsers_UserAccountId",
                table: "Staff",
                column: "UserAccountId",
                principalTable: "AbpUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_AbpUsers_UserAccountId",
                table: "Patients");

            migrationBuilder.DropForeignKey(
                name: "FK_Staff_AbpUsers_UserAccountId",
                table: "Staff");

            migrationBuilder.DropIndex(
                name: "IX_Staff_UserAccountId",
                table: "Staff");

            migrationBuilder.DropIndex(
                name: "IX_Patients_UserAccountId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "UserAccountId",
                table: "Staff");

            migrationBuilder.DropColumn(
                name: "UserAccountId",
                table: "Patients");
        }
    }
}
