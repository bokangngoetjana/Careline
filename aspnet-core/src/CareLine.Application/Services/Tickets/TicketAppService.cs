using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using CareLine.Domain.Patients;
using CareLine.Domain.Queues;
using CareLine.Domain.Tickets;
using CareLine.Services.Notifications;
using CareLine.Services.Tickets.Dto;
using Microsoft.EntityFrameworkCore;

namespace CareLine.Services.Tickets
{
    public class TicketAppService : AsyncCrudAppService<Ticket, TicketDto, Guid, PagedAndSortedResultRequestDto, CreateTicketDto, TicketDto>, ITicketAppService
    {
        private readonly TicketManager _ticketManager;
        private readonly IRepository<Ticket, Guid> _ticketRepository;
        private readonly IRepository<Patient, Guid> _patientRepository;
        private readonly IRepository<VisitQueue, Guid> _queueRepository;
        private readonly INotificationService _notificationService;

        public TicketAppService(
            IRepository<Ticket, Guid> repository,
            TicketManager ticketManager,
            IRepository<Patient, Guid> patientRepository,
            IRepository<VisitQueue, Guid> queueRepository,
            INotificationService notificationService) : base(repository)
        {
            _ticketManager = ticketManager;
            _ticketRepository = repository;
            _patientRepository = patientRepository;
            _queueRepository = queueRepository;
            _notificationService = notificationService;
        }
        public override async Task<TicketDto> CreateAsync(CreateTicketDto input)
        {
            var ticket = await _ticketManager.CreateTicketAsync(input.PatientId, input.QueueId, input.ServiceTypeId, input.Symptoms);

            var ticketDto = ObjectMapper.Map<TicketDto>(ticket);

            var patient = await _patientRepository.FirstOrDefaultAsync(input.PatientId);
            var queue = await _queueRepository.FirstOrDefaultAsync(input.QueueId);

            // Send real-time notifications
            if (patient != null && queue != null)
            {
                await _notificationService.NotifyTicketCreatedAsync(
                    ticketDto,
                    $"{patient.Name} {patient.Surname}",
                    queue.Name
                );

                // Also notify that the queue has been updated
                await _notificationService.NotifyQueueUpdatedAsync(input.QueueId);
            }

            return ticketDto;
        }
        public async Task<TicketDto> UpdateTicketStatus(UpdateTicketStatusDto input)
        {
            var ticket = await _ticketManager.UpdateTicketStatusAsync(input.Id, input.Status, input.StaffId);
            var ticketDto =  ObjectMapper.Map<TicketDto>(ticket);

            var patient = await _patientRepository.FirstOrDefaultAsync(ticket.PatientId);
            // Send real-time notifications
            if (patient != null)
            {
                await _notificationService.NotifyTicketStatusUpdatedAsync(
                    ticketDto,
                    $"{patient.Name} {patient.Surname}"
                );

                // Also notify that the queue has been updated
                await _notificationService.NotifyQueueUpdatedAsync(ticket.QueueId);
            }

            return ticketDto;
        }
        public async Task<List<TicketDto>> GetTicketsByQueueId(Guid queueId)
        {
            var tickets = await _ticketRepository
                .GetAll()
                .Where(t => t.QueueId == queueId)
                .OrderBy(t => t.QueueNumber)
                .ToListAsync();

            return ObjectMapper.Map<List<TicketDto>>(tickets);
        }
        public async Task<List<TicketDto>> GetTicketsByPatientId(Guid patientId)
        {
            var tickets = await _ticketRepository
                .GetAll()
                .Where(t => t.PatientId == patientId)
                .OrderByDescending(t => t.CheckInTime)
                .ToListAsync();

            return ObjectMapper.Map<List<TicketDto>>(tickets);
        }
    }
}
