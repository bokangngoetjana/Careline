using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace CareLine.EntityFrameworkCore
{
    public static class CareLineDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<CareLineDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<CareLineDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
