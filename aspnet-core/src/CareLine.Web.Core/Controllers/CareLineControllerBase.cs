using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace CareLine.Controllers
{
    public abstract class CareLineControllerBase: AbpController
    {
        protected CareLineControllerBase()
        {
            LocalizationSourceName = CareLineConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
