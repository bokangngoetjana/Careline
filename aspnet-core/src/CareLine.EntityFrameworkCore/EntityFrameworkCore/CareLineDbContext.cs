using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using CareLine.Authorization.Roles;
using CareLine.Authorization.Users;
using CareLine.MultiTenancy;
using CareLine.Domain.ClinicStaff;
using CareLine.Domain.Patients;
using CareLine.Domain.Tickets;
using CareLine.Domain.ServiceTypes;
using CareLine.Domain.Queues;
using CareLine.Domain.MedHistory;

namespace CareLine.EntityFrameworkCore
{
    public class CareLineDbContext : AbpZeroDbContext<Tenant, Role, User, CareLineDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Staff> Staff { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<ServiceType> ServiceType { get; set; }
        public DbSet<VisitQueue> VisitQueue { get; set; }
        public DbSet<StaffQueueAssignment> StaffQueueAssignment { get; set; }
        public DbSet<MedicalHistory> MedicalHistory { get; set; }

        public CareLineDbContext(DbContextOptions<CareLineDbContext> options)
            : base(options)
        {
        }
    }
}
