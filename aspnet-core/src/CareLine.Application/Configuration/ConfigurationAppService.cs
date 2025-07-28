using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using CareLine.Configuration.Dto;

namespace CareLine.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : CareLineAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
