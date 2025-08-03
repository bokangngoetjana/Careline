using System;
using Abp.Application.Services.Dto;
using CareLine.Domain.Enum;

namespace CareLine.Services.Tickets.Dto
{
    public class UpdateTicketStatusDto : EntityDto<Guid>
    {
        public TicketStatus Status { get; set; }
        public Guid? StaffId { get; set; }
    }
}
