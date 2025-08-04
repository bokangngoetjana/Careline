using System.Threading.Tasks;
using CareLine.Domain.Enum;

namespace CareLine.Services.EmailService
{
    public interface IEmailSender
    {
        Task SendTicketCreatedEmailAsync(string toEmail, string patientName, int queueNumber, string queueName);
        Task SendTicketStatusUpdateEmailAsync(string toEmail, string patientName, int queueNumber, TicketStatus status);
    }
}
