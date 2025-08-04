using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Dependency;
using CareLine.Domain.Enum;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace CareLine.Services.EmailService
{
    public class EmailSender : IEmailSender, ITransientDependency
    {
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendTicketCreatedEmailAsync(string toEmail, string patientName, int queueNumber, string queueName)
        {
            var subject = "Your Ticket Has Been Created";
            var body = $@"
                <h2>Your Queue Ticket Has Been Created</h2>
                <p>Dear {patientName},</p>
                <p>Your ticket has been successfully created:</p>
                <ul>
                    <li><strong>Queue:</strong> {queueName}</li>
                    <li><strong>Ticket Number:</strong> {queueNumber}</li>
                    <li><strong>Status:</strong> Waiting</li>
                </ul>
                <p>You will receive updates as your position in the queue changes.</p>
                <p>Thank you for using CareLine.</p>
            ";
            await SendEmailAsync(toEmail, subject, body);
        }
        public async Task SendTicketStatusUpdateEmailAsync(string toEmail, string patientName, int queueNumber, TicketStatus status)
        {
            var subject = $"Queue Update - Ticket #{queueNumber}";
            var body = $@"
                <h2>Queue Status Update</h2>
                <p>Dear {patientName},</p>
                <p>Your ticket status has been updated:</p>
                <ul>
                    <li><strong>Ticket Number:</strong> {queueNumber}</li>
                    <li><strong>New Status:</strong> {status.ToString()}</li>
                </ul>
                <p>Thank you for using CareLine.</p>
            ";

            await SendEmailAsync(toEmail, subject, body);
        }
        private async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress("CareLine", _configuration["Email:FromEmail"]));
                email.To.Add(new MailboxAddress("", toEmail));
                email.Subject = subject;

                var bodyBuilder = new BodyBuilder
                {
                    HtmlBody = body
                };
                email.Body = bodyBuilder.ToMessageBody();

                using var smtp = new SmtpClient();
                await smtp.ConnectAsync(_configuration["Email:SmtpServer"],
                    int.Parse(_configuration["Email:SmtpPort"]),
                    bool.Parse(_configuration["Email:UseSsl"]));

                await smtp.AuthenticateAsync(_configuration["Email:Username"],
                    _configuration["Email:Password"]);

                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
            }
            catch (System.Exception ex)
            {
                // Log the exception or handle it as needed
                throw new Exception("Failed to send email: " + ex.Message, ex);
            }
        }
    }
}
