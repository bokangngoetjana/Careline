using System.Threading.Tasks;
using CareLine.Configuration.Dto;

namespace CareLine.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
