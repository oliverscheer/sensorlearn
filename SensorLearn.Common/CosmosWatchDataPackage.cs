using SensorLearn.Common.Models;

namespace SensorLearn.Common
{
    public class CosmosSensorData : SensorData
    {
        public string EventProcessedUtcTime { get; set; }
        public string EventEnqueuedUtcTime { get; set; }
    }
}
