using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using CareLine.Domain.Enum;
using CareLine.Domain.Queues;
using CareLine.Services.Queues.Dto;
using Microsoft.EntityFrameworkCore;

namespace CareLine.Services.Queues
{
    public class VisitQueueAppService : AsyncCrudAppService<VisitQueue, VisitQueueDto, Guid>, IVisitQueueAppService
    {
        private readonly IRepository<VisitQueue, Guid> _visitRepository;
        public VisitQueueAppService(IRepository<VisitQueue, Guid> repository) : base(repository)
        {
            _visitRepository = repository;
        }
        public async Task<VisitQueueDto> GetActiveQueueAsync()
        {
            var now = DateTime.UtcNow;

            var activeQueue = await _visitRepository
                .GetAll()
                .Where(q => q.Status == QueueStatus.Open && q.EndTime > now)
                .OrderBy(q => q.StartTime)
                .FirstOrDefaultAsync();

            if(activeQueue == null)
            {
                return null;
            }
            return ObjectMapper.Map<VisitQueueDto>(activeQueue);
        }
    }
}
