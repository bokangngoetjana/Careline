using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace CareLine.Domain.MedHistory
{
    public class MedicalHistory : FullAuditedEntity<Guid>
    {
        public Guid TicketId { get; set; }
        public string Notes { get; set; }
        public string MedicationPrescribed { get; set; }
        public string FollowUpInstructions { get; set; }

    }
}
