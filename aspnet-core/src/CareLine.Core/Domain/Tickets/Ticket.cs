using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace CareLine.Domain.Tickets
{
    public class Ticket : FullAuditedEntity<Guid>
    {
        public Guid PatientId { get; set; }
        public Guid? StaffId { get; set; }
        public Guid QueueId { get; set; }
        public Guid ServiceTypeId { get; set; }

        public string Symptoms { get; set; }
        public int QueueNumber { get; set; }

    }
}
