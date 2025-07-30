using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using CareLine.Domain.ServiceTypes;
using CareLine.Services.ServiceTypes.Dto;

namespace CareLine.Services.ServiceTypes
{
    public class ServiceTypeAppService : AsyncCrudAppService<ServiceType, ServiceTypeDto, Guid>, IServiceTypeAppService
    {
        public ServiceTypeAppService(IRepository<ServiceType, Guid> repository) : base(repository)
        {
        }
    }
}
