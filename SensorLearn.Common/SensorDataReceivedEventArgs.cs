using SensorLearn.Common.Models;

namespace SensorLearn.Common
{
    public class SensorDataReceivedEventArgs
    {
        public SensorData WatchData { get; }

        public SensorDataReceivedEventArgs(SensorData watchData)
        {
            this.WatchData = watchData;
        }
    }
}