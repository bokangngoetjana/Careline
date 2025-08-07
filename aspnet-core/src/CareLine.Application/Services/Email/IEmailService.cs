using System.Threading.Tasks;
using CareLine.Domain.Tickets;

namespace CareLine.Services.Email
{
    public interface IEmailService
    {
        Task SendConfirmationEmailAsync(Ticket ticket);
        Task SendNextInQueueEmailAsync(Ticket ticket);
        Task SendCompletionEmailAsync(Ticket ticket);
    }
}
