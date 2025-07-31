using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
