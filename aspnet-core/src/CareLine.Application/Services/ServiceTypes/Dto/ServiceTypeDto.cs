using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CareLine.Domain.ServiceTypes;

namespace CareLine.Services.ServiceTypes.Dto
{
    [AutoMap(typeof(ServiceType))]
    public class ServiceTypeDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
