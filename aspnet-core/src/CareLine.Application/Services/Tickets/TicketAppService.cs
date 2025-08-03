using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using CareLine.Domain.Tickets;
using CareLine.Services.Tickets.Dto;

namespace CareLine.Services.Tickets
{
    public class TicketAppService : AsyncCrudAppService<Ticket, TicketDto, Guid, PagedAndSortedResultRequestDto, CreateTicketDto, TicketDto>, ITicketAppService
    {
        private readonly TicketManager _ticketManager;

        public TicketAppService(IRepository<Ticket, Guid> repository, TicketManager ticketManager) : base(repository)
        {
            _ticketManager = ticketManager;
        }
        public override async Task<TicketDto> CreateAsync(CreateTicketDto input)
        {
            var ticket = await _ticketManager.CreateTicketAsync(input.PatientId, input.QueueId, input.ServiceTypeId, input.Symptoms);
            return ObjectMapper.Map<TicketDto>(ticket);
        }
        public async Task<TicketDto> UpdateTicketStatus(UpdateTicketStatusDto input)
        {
            var ticket = await _ticketManager.UpdateTicketStatusAsync(input.Id, input.Status, input.StaffId);
            //var ticket = await Repository.GetAsync(input.Id);
            //ticket.Status = input.Status;
            //await Repository.UpdateAsync(ticket);
            return ObjectMapper.Map<TicketDto>(ticket);
        }
    }
}
