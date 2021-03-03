using Microsoft.AspNetCore.SignalR;
using SensorLearn.Common.Models;
using System.Threading;

namespace SensorLearn.Api.Hubs
{
    public class FakeSensorDataHub : Hub
    {
        private readonly IHubContext<FakeSensorDataHub> _hubContext;

        public FakeSensorDataHub(IHubContext<FakeSensorDataHub> hubContext)
        {
            _hubContext = hubContext;
            Timer timer = new Timer(MyTimerCallback, this, 1000, 50);
        }

        private void MyTimerCallback(object state)
        {
            var data = SensorData.GetSampleData();
                _hubContext
                    .Clients
                    .All
                    .SendAsync("ReceiveData", data)
                    .ConfigureAwait(false);
        }
    }
}
