using System;
using System.Configuration;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Producer;
using Newtonsoft.Json;
using SensorLearn.Common.Models;

namespace SensorLearn.SensorValueSimulator
{
    class Program
    {

        static async Task Main()
        {
            string eventHubConnectionString = ConfigurationManager.AppSettings["EventHubConnectionString"];
            string eventHubName = ConfigurationManager.AppSettings["EventHubName"]; 
            
            int maxMessages = 1000;
            int currentMessage = 0;
            int delayInMS = 1000;

            await using var producerClient = new EventHubProducerClient(eventHubConnectionString, eventHubName);
            while (currentMessage < maxMessages)
            {
                var data = SensorData.GetSampleData();
                var dataJson = JsonConvert.SerializeObject(data);
                var bytes = Encoding.UTF8.GetBytes(dataJson);
                var eventData = new EventData(bytes);

                using EventDataBatch eventBatch = await producerClient.CreateBatchAsync();
                eventBatch.TryAdd(eventData);
                await producerClient.SendAsync(eventBatch);

                Console.WriteLine(dataJson);

                Thread.Sleep(delayInMS);
                currentMessage++;
            }
        }
    }
}
