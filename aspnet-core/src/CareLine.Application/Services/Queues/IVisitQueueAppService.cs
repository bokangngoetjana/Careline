using System;
using Abp.Application.Services;
using CareLine.Services.Queues.Dto;

namespace CareLine.Services.Queues
{
    public interface IVisitQueueAppService : IAsyncCrudAppService<VisitQueueDto, Guid>
    {
    }
}
