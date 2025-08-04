using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using CareLine.Services.Tickets.Dto;

namespace CareLine.Services.Notifications
{
    public interface INotificationService : IApplicationService
    {
        Task NotifyTicketCreatedAsync(TicketDto ticket, string patientName, string queueName);
        Task NotifyTicketStatusUpdatedAsync(TicketDto ticket, string patientName);
        Task NotifyQueueUpdatedAsync(Guid queueId);
    }
}
