using Abp.Application.Services;
using CareLine.MultiTenancy.Dto;

namespace CareLine.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

