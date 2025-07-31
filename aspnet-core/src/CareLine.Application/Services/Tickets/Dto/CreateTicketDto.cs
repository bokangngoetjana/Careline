using System;
using Abp.Application.Services.Dto;

namespace CareLine.Services.Tickets.Dto
{
    public class CreateTicketDto : EntityDto<Guid>
    {
        public Guid PatientId { get; set; }
        public Guid QueueId { get; set; }
        public Guid ServiceTypeId { get; set; }
        public string Symptoms { get; set; }
    }
}
