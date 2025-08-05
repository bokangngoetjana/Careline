using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using CareLine.Services.MedHistory.Dto;

namespace CareLine.Services.MedHistory
{
    public interface IMedHistoryAppService : IApplicationService
    {
        Task<MedicalHistoryDto> CreateAsync(CreateMedHistoryDto input);
        Task<MedicalHistoryDto> GetByTicketIdAsync(Guid ticketId);
        Task<MedicalHistoryDto[]> GetByPatientIdAsync(Guid patientId);
    }
}
