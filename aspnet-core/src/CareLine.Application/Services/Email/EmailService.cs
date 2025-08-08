using System;
using CareLine.Domain.Tickets;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid.Helpers.Mail;
using SendGrid;
using Microsoft.Extensions.Options;

namespace CareLine.Services.Email
{
    public class SendGridOptions
    {
        public string FromEmail { get; set; }
        public string FromName { get; set; }
    }

    public class EmailService : IEmailService
    {
        private readonly ISendGridClient _sendGridClient;
        private readonly ILogger<EmailService> _logger;
        private readonly SendGridOptions _sendGridOptions;

        public EmailService(
            ISendGridClient sendGridClient,
            ILogger<EmailService> logger,
            IOptions<SendGridOptions> sendGridOptions)
        {
            _sendGridClient = sendGridClient;
            _logger = logger;
            _sendGridOptions = sendGridOptions.Value;
        }

        public async Task SendConfirmationEmailAsync(Ticket ticket)
        {
            try
            {
                var subject = $"Ticket Confirmation - #{ticket.QueueNumber}";
                var body = $"Hi {ticket.Patient.Name},\n\n" +
                           $"You have successfully checked in. Your ticket number is {ticket.QueueNumber}.\n" +
                           $"Service: {ticket.ServiceType?.Name}\n" +
                           $"Symptoms: {ticket.Symptoms}\n" +
                           $"Queue: {ticket.Queue?.Name}\n\n" +
                           "We will notify you when it's your turn.";

                await SendEmail(ticket.Patient.Email, subject, body);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send confirmation email for ticket {TicketId}", ticket.Id);
                throw; // Re-throw to let the caller handle it
            }
        }

        public async Task SendNextInQueueEmailAsync(Ticket ticket)
        {
            try
            {
                var subject = $"You're Next - Ticket #{ticket.QueueNumber}";
                var body = $"Hi {ticket.Patient.Name},\n\n" +
                           "You are next in the queue. Please be ready.\n" +
                           $"Queue: {ticket.Queue?.Name}\n" +
                           $"Service: {ticket.ServiceType?.Name}";

                await SendEmail(ticket.Patient.Email, subject, body);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send next-in-queue email for ticket {TicketId}", ticket.Id);
                throw;
            }
        }

        public async Task SendCompletionEmailAsync(Ticket ticket)
        {
            try
            {
                var subject = $"Ticket #{ticket.QueueNumber} - Completed";
                var body = $"Hi {ticket.Patient.Name},\n\n" +
                           "Your consultation is complete. Thank you for visiting CareLine.";

                await SendEmail(ticket.Patient.Email, subject, body);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send completion email for ticket {TicketId}", ticket.Id);
                throw;
            }
        }

        private async Task SendEmail(string toEmail, string subject, string body)
        {
            if (string.IsNullOrEmpty(toEmail))
            {
                _logger.LogWarning("Cannot send email: recipient email is null or empty");
                return;
            }

            try
            {
                var from = new EmailAddress(_sendGridOptions.FromEmail, _sendGridOptions.FromName);
                var to = new EmailAddress(toEmail);
                var msg = MailHelper.CreateSingleEmail(from, to, subject, body, null);

                _logger.LogInformation("Attempting to send email to {ToEmail} with subject '{Subject}'", toEmail, subject);

                var response = await _sendGridClient.SendEmailAsync(msg);

                _logger.LogInformation("Email sent to {ToEmail}. SendGrid response: {StatusCode}", toEmail, response.StatusCode);

                if (response.StatusCode != System.Net.HttpStatusCode.Accepted)
                {
                    var responseBody = await response.Body.ReadAsStringAsync();
                    _logger.LogWarning("SendGrid returned non-success status {StatusCode}: {ResponseBody}",
                        response.StatusCode, responseBody);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email to {ToEmail}", toEmail);
                throw;
            }
        }
    }
}