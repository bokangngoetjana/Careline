using System;
using Abp.Domain.Entities.Auditing;
using CareLine.Domain.Tickets;

namespace CareLine.Domain.MedHistory
{
    public class MedicalHistory : FullAuditedEntity<Guid>
    {
        public Guid TicketId { get; set; }
        public Ticket Ticket { get; set; }
        public string BloodPressure { get; set; }
        public decimal? Weight { get; set; }
        public string PrescribedMeds { get; set; }
        public string Dosage { get; set; }
        public string Notes { get; set; }
        public string MedicationPrescribed { get; set; }
        public string FollowUpInstructions { get; set; }

    }
}
