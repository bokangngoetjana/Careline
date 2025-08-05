using System;
using Abp.Application.Services.Dto;

namespace CareLine.Services.Tickets.Dto
{
    public class AssignmentDto : EntityDto
    {
        public Guid TicketId { get; set; }
        public Guid StaffId { get; set; }
    }
}
