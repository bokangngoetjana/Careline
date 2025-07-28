using System.Threading.Tasks;
using Abp.Application.Services;
using CareLine.Authorization.Accounts.Dto;

namespace CareLine.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
