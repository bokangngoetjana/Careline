using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Dependency;
using Abp.Domain.Repositories;
using CareLine.Domain.Patients;
using CareLine.Hubs;
using CareLine.Services.EmailService;
using CareLine.Services.Tickets.Dto;
using Microsoft.AspNetCore.SignalR;

namespace CareLine.Services.Notifications
{
    public class NotificationService : ApplicationService, INotificationService, ITransientDependency
    {
        private readonly IHubContext<QueueHub> _hubContext;
        private readonly IEmailSender _emailSender;
        private readonly IRepository<Patient, Guid> _patientRepository;

        public NotificationService(IHubContext<QueueHub> hubContext, IEmailSender emailSender, IRepository<Patient, Guid> patientRepository)
        {
            _emailSender = emailSender;
            _hubContext = hubContext;
            _patientRepository = patientRepository;
        }
        public async Task NotifyTicketCreatedAsync(TicketDto ticket, string patientName, string queueName)
        {
            // Prepare notification data
            var notificationData = new
            {
                Type = "TicketCreated",
                TicketId = ticket.Id,
                PatientId = ticket.PatientId,
                QueueId = ticket.QueueId,
                QueueNumber = ticket.QueueNumber,
                PatientName = patientName,
                QueueName = queueName,
                Status = ticket.Status.ToString(),
                CheckInTime = ticket.CheckInTime,
                Message = $"New ticket #{ticket.QueueNumber} created for {patientName} in {queueName}"
            };

            // Send real-time notifications
            await Task.WhenAll(
                // Notify specific queue subscribers
                _hubContext.Clients.Group($"queue_{ticket.QueueId}")
                    .SendAsync("TicketCreated", notificationData),

                // Notify staff
                _hubContext.Clients.Group("staff")
                    .SendAsync("NewTicketAlert", notificationData),

                // Notify the specific patient if they're connected
                _hubContext.Clients.Group($"user_{ticket.PatientId}")
                    .SendAsync("YourTicketCreated", notificationData)
            );
            // Get the patient's email and send notification
            var patient = await _patientRepository.FirstOrDefaultAsync(ticket.PatientId);
            if (!string.IsNullOrEmpty(patient?.Email))
            {
                await _emailSender.SendTicketCreatedEmailAsync(patient.Email, patientName, ticket.QueueNumber, queueName);
            }
            // Send email notification (you'll need to get patient email)
            // For now, we'll leave this as a placeholder - you'll need to get the patient's email
            // await _emailSender.SendTicketCreatedEmailAsync(patientEmail, patientName, ticket.QueueNumber, queueName);
        }
        public async Task NotifyTicketStatusUpdatedAsync(TicketDto ticket, string patientName)
        {
            var notificationData = new
            {
                Type = "TicketStatusUpdated",
                TicketId = ticket.Id,
                PatientId = ticket.PatientId,
                QueueId = ticket.QueueId,
                QueueNumber = ticket.QueueNumber,
                PatientName = patientName,
                Status = ticket.Status.ToString(),
                Message = $"Ticket #{ticket.QueueNumber} status updated to {ticket.Status}"
            };

            await Task.WhenAll(
                // Notify queue subscribers
                _hubContext.Clients.Group($"queue_{ticket.QueueId}")
                    .SendAsync("TicketStatusUpdated", notificationData),

                // Notify the specific patient
                _hubContext.Clients.Group($"user_{ticket.PatientId}")
                    .SendAsync("YourTicketUpdated", notificationData),

                // Notify staff
                _hubContext.Clients.Group("staff")
                    .SendAsync("TicketStatusChanged", notificationData)
            );

            // Get the patient's email and send notification
            var patient = await _patientRepository.FirstOrDefaultAsync(ticket.PatientId);
            if (!string.IsNullOrEmpty(patient?.Email))
            {
                await _emailSender.SendTicketStatusUpdateEmailAsync(patient.Email, patientName, ticket.QueueNumber, ticket.Status);
            }
        }
        public async Task NotifyQueueUpdatedAsync(Guid queueId)
        {
            await _hubContext.Clients.Group($"queue_{queueId}")
                .SendAsync("QueueUpdated", new { QueueId = queueId });
        }
    }
}
