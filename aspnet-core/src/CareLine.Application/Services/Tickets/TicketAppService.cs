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

namespace CareLine.Services.Tickets
{
    public class TicketAppService : AsyncCrudAppService<Ticket, TicketDto, Guid, PagedAndSortedResultRequestDto, CreateTicketDto, TicketDto>, ITicketAppService
    {
        private readonly TicketManager _ticketManager;
        private readonly IRepository<Ticket, Guid> _ticketRepository;

        public async Task AssignStaffToTicketAsync(AssignmentDto input)
        {
            var ticket = await _ticketRepository
                .FirstOrDefaultAsync(t => t.Id == input.TicketId);

            if(ticket == null)
            {
                throw new UserFriendlyException("Ticket not found");
            }

            if(ticket.Status != TicketStatus.Waiting)
                throw new UserFriendlyException("Ticket is not in a Waiting state");

            ticket.StaffId = input.StaffId;
            ticket.Status = TicketStatus.InProgress;

            await _ticketRepository.UpdateAsync(ticket);
        }
        public TicketAppService(IRepository<Ticket, Guid> repository, TicketManager ticketManager) : base(repository)
        {
            _ticketManager = ticketManager;
            _ticketRepository = repository;
        }
        public override async Task<TicketDto> CreateAsync(CreateTicketDto input)
        {
            var ticket = await _ticketManager.CreateTicketAsync(input.PatientId, input.QueueId, input.ServiceTypeId, input.Symptoms);
            return ObjectMapper.Map<TicketDto>(ticket);
        }
        public async Task<TicketDto> UpdateTicketStatus(UpdateTicketStatusDto input)
        {
            var ticket = await _ticketManager.UpdateTicketStatusAsync(input.Id, input.Status, input.StaffId);
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
    }
}
