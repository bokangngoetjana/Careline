using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using CareLine.Domain.MedHistory;
using CareLine.Domain.Patients;
using CareLine.Domain.Tickets;
using CareLine.Services.MedHistory.Dto;
using Microsoft.EntityFrameworkCore;

namespace CareLine.Services.MedHistory
{
    public class MedHistoryAppService : ApplicationService, IMedHistoryAppService
    {
        private readonly IRepository<MedicalHistory, Guid> _medicalHistoryRepository;
        private readonly IRepository<Ticket, Guid> _ticketRepository;
        private readonly IRepository<Patient, Guid> _patientRepository;

        public MedHistoryAppService(
            IRepository<MedicalHistory, Guid> medicalHistoryRepository,
            IRepository<Ticket, Guid> ticketRepository,
            IRepository<Patient, Guid> patientRepository)
        {
            _medicalHistoryRepository = medicalHistoryRepository;
            _ticketRepository = ticketRepository;
            _patientRepository = patientRepository;
        }
        public async Task<MedicalHistoryDto> CreateAsync(CreateMedHistoryDto input)
        {
            var ticket = await _ticketRepository
                .GetAllIncluding(t => t.Patient)
                .FirstOrDefaultAsync(t => t.Id == input.TicketId);

            if (ticket == null)
                throw new UserFriendlyException("Ticket not found");

            // Optional: Only allow if ticket is assigned to staff (security check)
            if (!ticket.StaffId.HasValue)
                throw new UserFriendlyException("Ticket is not assigned to a staff member");

            var existingHistory = await _medicalHistoryRepository
                .FirstOrDefaultAsync(m => m.TicketId == input.TicketId);

            if(existingHistory == null)
            {
                existingHistory = new MedicalHistory
                {
                    TicketId = input.TicketId,
                    Notes = input.Notes,
                    MedicationPrescribed = input.MedicationPrescribed,
                    FollowUpInstructions = input.FollowUpInstructions,
                    BloodPressure = input.BloodPressure,
                    Weight = input.Weight,
                    Dosage = input.Dosage,
                };
                await _medicalHistoryRepository.InsertAsync(existingHistory);
            }
            else
            {
                existingHistory.Notes = input.Notes;
                existingHistory.MedicationPrescribed = input.MedicationPrescribed;
                existingHistory.FollowUpInstructions = input.FollowUpInstructions;
                existingHistory.BloodPressure = input.BloodPressure;
                existingHistory.Weight = input.Weight;
                existingHistory.Dosage = input.Dosage;

                await _medicalHistoryRepository.UpdateAsync(existingHistory);
            }
            await CurrentUnitOfWork.SaveChangesAsync();

            return new MedicalHistoryDto
            {
                Id = existingHistory.Id,
                TicketId = existingHistory.TicketId,
                Notes = existingHistory.Notes,
                MedicationPrescribed = existingHistory.MedicationPrescribed,
                FollowUpInstructions = existingHistory.FollowUpInstructions,
                BloodPressure = existingHistory.BloodPressure,
                Weight = existingHistory.Weight,
                Dosage = existingHistory.Dosage,
                PatientName = $"{ticket.Patient.Name} {ticket.Patient.Surname}",
                QueueNumber = ticket.QueueNumber
            };

        }
        public async Task<MedicalHistoryDto> GetByTicketIdAsync(Guid ticketId)
        {
            var history = await _medicalHistoryRepository
                .GetAllIncluding(m => m.Ticket, m => m.Ticket.Patient)
                .FirstOrDefaultAsync(m => m.TicketId == ticketId);

            if (history == null)
                throw new UserFriendlyException("Medical history not found");

            return new MedicalHistoryDto
            {
                Id = history.Id,
                TicketId = history.TicketId,
                Notes = history.Notes,
                MedicationPrescribed = history.MedicationPrescribed,
                FollowUpInstructions = history.FollowUpInstructions,
                BloodPressure = history.BloodPressure,
                Weight = history.Weight,
                Dosage = history.Dosage,
                PatientName = $"{history.Ticket.Patient.Name} {history.Ticket.Patient.Surname}",
                QueueNumber = history.Ticket.QueueNumber
            };
        }
        public async Task<MedicalHistoryDto[]> GetByPatientIdAsync(Guid patientId)
        {
            var histories = await _medicalHistoryRepository
                .GetAllIncluding(m => m.Ticket, m => m.Ticket.Patient)
                .Where(m => m.Ticket.PatientId == patientId)
                .ToListAsync();

                return histories.Select(history => new MedicalHistoryDto
                {
                    Id = history.Id,
                    TicketId = history.TicketId,
                    Notes = history.Notes,
                    MedicationPrescribed = history.MedicationPrescribed,
                    FollowUpInstructions = history.FollowUpInstructions,
                    BloodPressure = history.BloodPressure,
                    Weight = history.Weight,
                    Dosage = history.Dosage,
                    PatientName = $"{history.Ticket.Patient.Name} {history.Ticket.Patient.Surname}",
                    QueueNumber = history.Ticket.QueueNumber
                }).ToArray();
        }
    }
}
