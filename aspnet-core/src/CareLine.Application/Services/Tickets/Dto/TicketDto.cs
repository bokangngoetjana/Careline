using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CareLine.Domain.Enum;
using CareLine.Domain.Tickets;

namespace CareLine.Services.Tickets.Dto
{
    [AutoMap(typeof(Ticket))]
    public class TicketDto : EntityDto<Guid>
    {
        public Guid PatientId { get; set; }
        public Guid? StaffId { get; set; }
        public Guid QueueId { get; set; }
        public Guid ServiceTypeId { get; set; }
        public string Symptoms { get; set; }
        public int QueueNumber { get; set; }
        public TicketStatus Status { get; set; }
        public DateTime CheckInTime { get; set; }
    }
}
