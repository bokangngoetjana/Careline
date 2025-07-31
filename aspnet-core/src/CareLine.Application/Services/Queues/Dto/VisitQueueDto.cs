using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CareLine.Domain.Enum;
using CareLine.Domain.Queues;

namespace CareLine.Services.Queues.Dto
{
    [AutoMap(typeof(VisitQueue))]
    public class VisitQueueDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public QueueStatus Status { get; set; }
    }
}
