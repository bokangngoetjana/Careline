using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;

namespace CareLine.Services.MedHistory.Dto
{
    public class MedicalHistoryDto : EntityDto<Guid>
    {
        public Guid TicketId { get; set; }
        public string Notes { get; set; }
        public string MedicationPrescribed { get; set; }
        public string FollowUpInstructions { get; set; }
        public string BloodPressure { get; set; }
        public decimal? Weight { get; set; }
        public string Dosage { get; set; }
        public string PatientName { get; set; }
        public int QueueNumber { get; set; }
    }
}
