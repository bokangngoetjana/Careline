using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using CareLine.Domain.Queues;

namespace CareLine.Domain.ClinicStaff
{
    public class StaffQueueAssignment : FullAuditedEntity<Guid>
    {
        public Guid StaffId { get; set; }
        public Guid QueueId { get; set; }

        public Staff Staff { get; set; }
        public VisitQueue Queue { get; set; }
        public DateTime AssignedDate { get; set; } 
    }
}
