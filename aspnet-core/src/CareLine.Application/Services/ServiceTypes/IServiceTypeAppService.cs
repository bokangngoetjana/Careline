using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using CareLine.Services.ServiceTypes.Dto;

namespace CareLine.Services.ServiceTypes
{
    public interface IServiceTypeAppService : IAsyncCrudAppService<ServiceTypeDto, Guid>
    {
    }
}
