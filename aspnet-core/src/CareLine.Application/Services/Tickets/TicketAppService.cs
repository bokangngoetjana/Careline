using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using CareLine.Domain.Tickets;
using CareLine.Services.Tickets.Dto;
using Microsoft.EntityFrameworkCore;

namespace CareLine.Services.Tickets
{
    public class TicketAppService : AsyncCrudAppService<Ticket, TicketDto, Guid, PagedAndSortedResultRequestDto, CreateTicketDto, TicketDto>, ITicketAppService
    {
        private readonly TicketManager _ticketManager;
        private readonly IRepository<Ticket, Guid> _ticketRepository;

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
