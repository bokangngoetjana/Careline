using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using CareLine.Authorization;

namespace CareLine
{
    [DependsOn(
        typeof(CareLineCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class CareLineApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<CareLineAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(CareLineApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
