using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using CareLine.Authorization.Roles;
using CareLine.Authorization.Users;
using CareLine.MultiTenancy;
using CareLine.Domain.Patients;

namespace CareLine.EntityFrameworkCore
{
    public class CareLineDbContext : AbpZeroDbContext<Tenant, Role, User, CareLineDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Patient> Patients { get; set; }
        public CareLineDbContext(DbContextOptions<CareLineDbContext> options)
            : base(options)
        {
        }
    }
}
