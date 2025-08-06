using System;
using Abp.Application.Services;
using CareLine.Services.ServiceTypes.Dto;

namespace CareLine.Services.ServiceTypes
{
    public interface IServiceTypeAppService : IAsyncCrudAppService<ServiceTypeDto, Guid>
    {
    }
}
