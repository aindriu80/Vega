﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class populateMakesModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert INTO Makes (Name) VALUES('Make1')");
            migrationBuilder.Sql("Insert INTO Makes (Name) VALUES('Make2')");
            migrationBuilder.Sql("Insert INTO Makes (Name) VALUES('Make3')");

            migrationBuilder.Sql("Insert INTO Models (Name, MakeID) VALUES('Make1-ModelA',1)");
            migrationBuilder.Sql("Insert INTO Models (Name, MakeID) VALUES('Make1-ModelB',1)");
            migrationBuilder.Sql("Insert INTO Models (Name, MakeID) VALUES('Make1-ModelC',1)");

            migrationBuilder.Sql("Insert INTO Models (Name, MakeID) VALUES('Make2-ModelA',2)");
            migrationBuilder.Sql("Insert INTO Models (Name, MakeID) VALUES('Make2-ModelB',2)");
            migrationBuilder.Sql("Insert INTO Models (Name, MakeID) VALUES('Make2-ModelC',2)");

            migrationBuilder.Sql("Insert INTO Models (Name, MakeID) VALUES('Make3-ModelA',3)");
            migrationBuilder.Sql("Insert INTO Models (Name, MakeID) VALUES('Make3-ModelB',3)");
            migrationBuilder.Sql("Insert INTO Models (Name, MakeID) VALUES('Make3-ModelC',3)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}