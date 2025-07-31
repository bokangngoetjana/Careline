using System;
using System.Collections.Generic;
using Abp.Domain.Entities.Auditing;
using CareLine.Domain.ClinicStaff;
using CareLine.Domain.Enum;
using CareLine.Domain.Tickets;

namespace CareLine.Domain.Queues
{
    public class VisitQueue : FullAuditedEntity<Guid>
    {
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public QueueStatus Status { get; set; } // Open, Closed, Paused

        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<StaffQueueAssignment> StaffQueueAssignments { get; set; }

    }
}
