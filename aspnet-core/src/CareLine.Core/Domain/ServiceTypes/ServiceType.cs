using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using CareLine.Domain.Tickets;

namespace CareLine.Domain.ServiceTypes
{
    public class ServiceType : FullAuditedEntity<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}
