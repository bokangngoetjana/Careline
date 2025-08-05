using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using CareLine.Services.Queues.Dto;

namespace CareLine.Services.Queues
{
    public interface IVisitQueueAppService : IAsyncCrudAppService<VisitQueueDto, Guid>
    {
        Task<VisitQueueDto> GetActiveQueueAsync();
    }
}
