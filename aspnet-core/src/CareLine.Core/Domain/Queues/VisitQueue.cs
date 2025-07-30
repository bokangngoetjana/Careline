using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using CareLine.Domain.ClinicStaff;
using CareLine.Domain.Tickets;

namespace CareLine.Domain.Queues
{
    public class VisitQueue : FullAuditedEntity<Guid>
    {
        public string Name { get; set; }
        public DateTime StartTime { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<StaffQueueAssignment> StaffQueueAssignments { get; set; }

    }
}
