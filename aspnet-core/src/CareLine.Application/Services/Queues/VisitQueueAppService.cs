using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using CareLine.Domain.Queues;
using CareLine.Services.Queues.Dto;

namespace CareLine.Services.Queues
{
    public class VisitQueueAppService : AsyncCrudAppService<VisitQueue, VisitQueueDto, Guid>, IVisitQueueAppService
    {
        public VisitQueueAppService(IRepository<VisitQueue, Guid> repository) : base(repository)
        {
        }
    }
}
