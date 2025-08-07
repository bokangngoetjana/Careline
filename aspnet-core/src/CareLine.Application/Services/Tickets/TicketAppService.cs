using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using CareLine.Domain.Enum;
using CareLine.Domain.Tickets;
using CareLine.Services.Tickets.Dto;
using Microsoft.EntityFrameworkCore;
using CareLine.Services.Email;

namespace CareLine.Services.Tickets
{
    public class TicketAppService : AsyncCrudAppService<Ticket, TicketDto, Guid, PagedAndSortedResultRequestDto, CreateTicketDto, TicketDto>, ITicketAppService
    {
        private readonly TicketManager _ticketManager;
        private readonly IRepository<Ticket, Guid> _ticketRepository;
        private readonly IEmailService _emailService;

        public TicketAppService(IRepository<Ticket, Guid> repository, TicketManager ticketManager, IEmailService emailService) : base(repository)
        {
            _ticketManager = ticketManager;
            _ticketRepository = repository;
            _emailService = emailService;
        }
        public async Task AssignStaffToTicketAsync(AssignmentDto input)
        {
            var ticket = await _ticketRepository
                .FirstOrDefaultAsync(t => t.Id == input.TicketId);

            if (ticket == null)
            {
                throw new UserFriendlyException("Ticket not found");
            }

            if (ticket.Status != TicketStatus.Waiting)
                throw new UserFriendlyException("Ticket is not in a Waiting state");

            ticket.StaffId = input.StaffId;
            ticket.Status = TicketStatus.InProgress;

            await _ticketRepository.UpdateAsync(ticket);
        }
        public override async Task<TicketDto> CreateAsync(CreateTicketDto input)
        {
            var ticket = await _ticketManager.CreateTicketAsync(input.PatientId, input.QueueId, input.ServiceTypeId, input.Symptoms);
            await _emailService.SendConfirmationEmailAsync(ticket);
            return ObjectMapper.Map<TicketDto>(ticket);
        }
        public async Task<TicketDto> UpdateTicketStatus(UpdateTicketStatusDto input)
        {
            var ticket = await _ticketManager.UpdateTicketStatusAsync(input.Id, input.Status, input.StaffId);
            // Check if this ticket is now the first in line (Waiting queue)
            if (ticket.Status == TicketStatus.Waiting)
            {
                // Get the first ticket in this queue with status Waiting
                var firstInQueue = await _ticketRepository
                    .GetAll()
                    .Where(t => t.QueueId == ticket.QueueId && t.Status == TicketStatus.Waiting)
                    .OrderBy(t => t.QueueNumber)
                    .FirstOrDefaultAsync();

                if (firstInQueue != null && firstInQueue.Id == ticket.Id)
                {
                    await _emailService.SendNextInQueueEmailAsync(ticket);
                }
            }
            // Or send completion email if just completed
            if (ticket.Status == TicketStatus.Completed)
            {
                await _emailService.SendCompletionEmailAsync(ticket);
            }

            return ObjectMapper.Map<TicketDto>(ticket);
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
        public override async Task<PagedResultDto<TicketDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            var query = _ticketRepository.GetAllIncluding(
                t => t.Patient,
                t => t.Staff,
                t => t.Queue,
                t => t.ServiceType);

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderBy(t => t.QueueNumber)
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToListAsync();

            var result = items.Select(t => new TicketDto
            {
                Id = t.Id,
                PatientId = t.PatientId,
                StaffId = t.StaffId,
                QueueId = t.QueueId,
                ServiceTypeId = t.ServiceTypeId,
                Symptoms = t.Symptoms,
                QueueNumber = t.QueueNumber,
                Status = t.Status,
                CheckInTime = t.CheckInTime,

                PatientName = t.Patient != null ? $"{t.Patient.Name} {t.Patient.Surname}" : null,
                StaffName = t.Staff != null ? $"{t.Staff.Name} {t.Staff.Surname}" : null,
                QueueName = t.Queue?.Name,
                ServiceTypeName = t.ServiceType?.Name
            }).ToList();

            return new PagedResultDto<TicketDto>(totalCount, result);
        }
    }
}
