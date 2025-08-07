using System;
using CareLine.Domain.Tickets;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace CareLine.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly string _sendGridApiKey;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _sendGridApiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            _logger = logger;

            if (string.IsNullOrEmpty(_sendGridApiKey))
                throw new Exception("SendGrid API key not found in environment variables.");
        }
        public async Task SendConfirmationEmailAsync(Ticket ticket)
        {
            var subject = $"Ticket Confirmation - #{ticket.QueueNumber}";
            var body = $"Hi {ticket.Patient.Name},\n\n" +
                       $"You have successfully checked in. Your ticket number is {ticket.QueueNumber}.\n" +
                       $"Service: {ticket.ServiceType?.Name}\n" +
                       $"Symptoms: {ticket.Symptoms}\n" +
                       $"Queue: {ticket.Queue?.Name}\n\n" +
                       "We will notify you when it’s your turn.";

            await SendEmail(ticket.Patient.Email, subject, body);
        }
        public async Task SendNextInQueueEmailAsync(Ticket ticket)
        {
            var subject = $"You're Next - Ticket #{ticket.QueueNumber}";
            var body = $"Hi {ticket.Patient.Name},\n\n" +
                       "You are next in the queue. Please be ready.\n" +
                       $"Queue: {ticket.Queue?.Name}\n" +
                       $"Service: {ticket.ServiceType?.Name}";

            await SendEmail(ticket.Patient.Email, subject, body);
        }
        public async Task SendCompletionEmailAsync(Ticket ticket)
        {
            var subject = $"Ticket #{ticket.QueueNumber} - Completed";
            var body = $"Hi {ticket.Patient.Name},\n\n" +
                       "Your consultation is complete. Thank you for visiting CareLine.";

            await SendEmail(ticket.Patient.Email, subject, body);
        }
        private async Task SendEmail(string toEmail, string subject, string body)
        {
            var client = new SendGridClient(_sendGridApiKey);
            var from = new EmailAddress("bokang.ngoetjane@boxfusion.io", "CareLine Queue System");
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, body, null);

            var response = await client.SendEmailAsync(msg);
            _logger.LogInformation($"Email to {toEmail}: {response.StatusCode}");
        }
    }
}
