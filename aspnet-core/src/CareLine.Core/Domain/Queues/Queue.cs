using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace CareLine.Domain.Queues
{
    public class Queue : FullAuditedEntity<Guid>
    {
        public string Name { get; set; }
        public DateTime StartTime { get; set; }

    }
}
