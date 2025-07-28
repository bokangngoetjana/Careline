using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using CareLine.Authorization.Roles;
using CareLine.Authorization.Users;
using CareLine.MultiTenancy;

namespace CareLine.EntityFrameworkCore
{
    public class CareLineDbContext : AbpZeroDbContext<Tenant, Role, User, CareLineDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public CareLineDbContext(DbContextOptions<CareLineDbContext> options)
            : base(options)
        {
        }
    }
}
