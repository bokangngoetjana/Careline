using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using CareLine.Domain.ClinicStaff;
using CareLine.Domain.Enum;
using CareLine.Domain.Patients;
using CareLine.Domain.Queues;
using CareLine.Domain.ServiceTypes;

namespace CareLine.Domain.Tickets
{
    public class TicketManager : DomainService
    {
        private readonly IRepository<Ticket, Guid> _ticketRepository;
        private readonly IRepository<VisitQueue, Guid> _queueRepository;
        private readonly IRepository<Patient, Guid> _patientRepository;
        private readonly IRepository<ServiceType, Guid> _serviceTypeRepository;
        private readonly IRepository<Staff, Guid> _staffRepository;

        public TicketManager(IRepository<Ticket, Guid> ticketRepository, IRepository<VisitQueue, Guid> queueRepository, IRepository<Patient, Guid> patientRepository, IRepository<ServiceType, Guid> serviceTypeRepository, IRepository<Staff, Guid> staffRepository)
        {
            _patientRepository = patientRepository;
            _ticketRepository = ticketRepository;
            _queueRepository = queueRepository;
            _serviceTypeRepository = serviceTypeRepository;
            _staffRepository = staffRepository;
        }
        public async Task<Ticket> CreateTicketAsync(Guid patientId, Guid queueId, Guid serviceTypeId, string symptoms)
        {
            var patient = await _patientRepository.FirstOrDefaultAsync(patientId)
                ?? throw new ArgumentException("Invalid patient ID");
            
            var queue = await _queueRepository.FirstOrDefaultAsync(queueId)
                ?? throw new ArgumentException("Invalid queue ID");

            var serviceType = await _serviceTypeRepository.FirstOrDefaultAsync(serviceTypeId);

            // Generate queue / ticket number

            var maxQueueNumber = _ticketRepository
                .GetAll()
                .Where(t => t.QueueId == queueId)
                .Select(t => (int?)t.QueueNumber)
                .Max() ?? 0;

            var nextQueueNumber = maxQueueNumber + 1;
            // Create a ticket

            var ticket = new Ticket
            {
                PatientId = patientId,
                QueueId = queueId,
                ServiceTypeId = serviceTypeId,
                Symptoms = symptoms,
                QueueNumber = nextQueueNumber,
                Status = TicketStatus.Waiting, // Default status is Waiting
                CheckInTime = DateTime.UtcNow // Default to current time when ticket is created
            };
            await _ticketRepository.InsertAsync(ticket);
            return ticket;
        }
        public async Task<Ticket> UpdateTicketStatusAsync(Guid ticketId, TicketStatus newStatus, Guid? staffId = null)
        {
            var ticket = await _ticketRepository.FirstOrDefaultAsync(ticketId)
                ?? throw new ArgumentException("Invalid ticket ID");
            ticket.Status = newStatus;
            if (staffId.HasValue)
            {
                ticket.StaffId = staffId.Value;
            }
            //await _ticketRepository.UpdateAsync(ticket);
            return ticket;
        }

    }
}
