using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using SensorLearn.Common;
using SensorLearn.Common.Models;

namespace SensorLearn.Api.Hubs
{
    public class SensorDataHub : Hub
    {
        private readonly IHubContext<SensorDataHub> _hubContext;
        private readonly EventHubReceiver _eventHubReceiver;

        public SensorDataHub(IHubContext<SensorDataHub> hubContext, IConfiguration configuration)
        {
            _hubContext = hubContext;

            _eventHubReceiver = new EventHubReceiver(configuration);
            _eventHubReceiver.SensorDataReceived += EventHubReceiver_SensorDataReceived;
            _eventHubReceiver.Start().ConfigureAwait(false);
        }

        private void EventHubReceiver_SensorDataReceived(object sender, SensorDataReceivedEventArgs e)
        {
            var data = e.WatchData;
            _hubContext.Clients
                .All
                .SendAsync("ReceiveData", data)
                .ConfigureAwait(false);
        }
    }
}
