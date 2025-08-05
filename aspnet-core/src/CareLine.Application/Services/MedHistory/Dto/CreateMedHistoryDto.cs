using System;
using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;

namespace CareLine.Services.MedHistory.Dto
{
    public class CreateMedHistoryDto : EntityDto<Guid?>
    {
        [Required]
        public Guid TicketId { get; set; }
        public string Notes { get; set; }
        public string MedicationPrescribed { get; set; }
        public string FollowUpInstructions { get; set; }
        public string BloodPressure { get; set; }
        public decimal? Weight { get; set; }
        public string Dosage { get; set; }
    }
}
