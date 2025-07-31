using System;
using Abp.Domain.Entities.Auditing;
using CareLine.Domain.Enum;
using CareLine.Domain.MedHistory;
using CareLine.Domain.Patients;
using CareLine.Domain.Queues;
using CareLine.Domain.ServiceTypes;

namespace CareLine.Domain.Tickets
{
    public class Ticket : FullAuditedEntity<Guid>
    {
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }


        //public Guid? StaffId { get; set; }
        //public Staff Staff { get; set; }


        public Guid QueueId { get; set; }
        public VisitQueue Queue { get; set; }


        public Guid ServiceTypeId { get; set; }
        public ServiceType ServiceType { get; set; }

        public string Symptoms { get; set; }
        public int QueueNumber { get; set; }
        public TicketStatus Status { get; set; } = TicketStatus.Waiting; // Default status is Waiting
        public bool IsServed => Status == TicketStatus.Completed;
        public DateTime CheckInTime { get; set; } = DateTime.UtcNow; // Default to current time when ticket is created

        //Navigation properties
        public MedicalHistory MedicalHistory { get; set; }

    }
}
