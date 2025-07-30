using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using CareLine.Domain.ClinicStaff;
using CareLine.Domain.MedHistory;
using CareLine.Domain.Patients;
using CareLine.Domain.Queues;
using CareLine.Domain.ServiceTypes;

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

        //Navigation properties
        public Patient Patient { get; set; }
        public Staff Staff { get; set; }
        public VisitQueue Queue { get; set; }
        public ServiceType ServiceType { get; set; }
        public MedicalHistory MedicalHistory { get; set; }

    }
}
