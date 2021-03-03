using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SensorLearn.Common.Models
{
    public class SensorData
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }
        public double AccelerationX{ get; set; }
        public double AccelerationY { get; set; }
        public double AccelerationZ { get; set; }
        public int HeartRate { get; set; }
        public int Cadence { get; set; }
        public int MagnitudeX { get; set; }
        public int MagnitudeY { get; set; }
        public int MagnitudeZ { get; set; }
        public int Power { get; set; }
        public double Heading { get; set; }
        public double Speed { get; set; }
        public double Temperature { get; set; }
        public double Pressure { get; set; }
        public string UserID{ get; set; }
        public string DeviceDateTime { get; set; }

        public static SensorData GetSampleData()
        {
            SensorData result = new SensorData();
            Random rnd = new Random();

            result.Id = Guid.NewGuid().ToString();
            result.Latitude = rnd.NextDouble()*180-90;
            result.Longitude =rnd.NextDouble()*360-180;
            result.Altitude =rnd.NextDouble()*10;
            result.AccelerationX = rnd.NextDouble();
            result.AccelerationY = rnd.NextDouble();
            result.AccelerationZ = rnd.NextDouble();
            result.HeartRate = rnd.Next() * 130 + 40;
            result.Cadence = rnd.Next()*100;
            //result.MagnitudeX = 1;
            //result.MagnitudeY =;
            //result.MagnitudeZ =;
            result.Power = rnd.Next(100);
            result.Heading = rnd.Next(360);
            result.Speed = rnd.Next(100);
            result.Temperature = rnd.NextDouble()*50-15;
            result.Pressure =rnd.Next(100);
            result.DeviceDateTime = DateTime.Now.ToString();
            result.UserID = "Simulator";
            return result;
        }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
