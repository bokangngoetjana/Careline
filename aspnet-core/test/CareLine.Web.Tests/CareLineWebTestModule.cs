using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CareLine.EntityFrameworkCore;
using CareLine.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace CareLine.Web.Tests
{
    [DependsOn(
        typeof(CareLineWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class CareLineWebTestModule : AbpModule
    {
        public CareLineWebTestModule(CareLineEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(CareLineWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(CareLineWebMvcModule).Assembly);
        }
    }
}