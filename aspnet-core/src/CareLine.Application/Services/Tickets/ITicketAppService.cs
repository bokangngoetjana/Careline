using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using CareLine.Services.Tickets.Dto;

namespace CareLine.Services.Tickets
{
    public interface ITicketAppService : IAsyncCrudAppService<TicketDto, Guid, PagedAndSortedResultRequestDto, CreateTicketDto, TicketDto>
    {
        Task<TicketDto> UpdateTicketStatus(UpdateTicketStatusDto input);
    }
}
