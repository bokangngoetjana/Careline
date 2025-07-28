using System.Threading.Tasks;
using Abp.Application.Services;
using CareLine.Sessions.Dto;

namespace CareLine.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
