using System.Threading.Tasks;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CareLine.Hubs
{
    [Authorize]
    public class QueueHub : Hub
    {
        private readonly IAbpSession _abpSession;
        public QueueHub(IAbpSession abpSession)
        {
            _abpSession = abpSession;
        }
        public override async Task OnConnectedAsync()
        {
           
            if (_abpSession.UserId.HasValue)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, $"user_{_abpSession.UserId}");
            }
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(System.Exception exception)
        {
            // Remove from groups when disconnected
            if (_abpSession.UserId.HasValue)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"user_{_abpSession.UserId}");
            }

            await base.OnDisconnectedAsync(exception);
        }
        // Method to join a specific queue for real-time updates
        public async Task JoinQueue(string queueId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"queue_{queueId}");
        }
        // Method to leave a specific queue
        public async Task LeaveQueue(string queueId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"queue_{queueId}");
        }
        // Method for staff to join staff notifications
        public async Task JoinStaffNotifications()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "staff");
        }
    }
}
