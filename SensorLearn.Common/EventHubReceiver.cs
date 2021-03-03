using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Consumer;
using Azure.Messaging.EventHubs.Processor;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SensorLearn.Common.Models;
using System;
using System.Text;
using System.Threading.Tasks;

namespace SensorLearn.Common
{
    public class EventHubReceiver
    {
        private readonly EventProcessorClient _processor;
        //private readonly IConfiguration Configuration;

        public EventHubReceiver(IConfiguration configuration)
        {
            //Configuration = configuration;

            string ehubNamespaceConnectionString = configuration["EventHub:ConnectionString"];//  "Endpoint=sb://garmin.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=NqLHCXO/N3MfWufwGwQLOr6Tcqxqh0rUXG3eIJf0xG4=";
            string eventHubName = configuration["EventHub:Hubname"];

            string blobStorageConnectionString = configuration["StorageAccount:ConnectionString"];
            string blobContainerName = configuration["StorageAccount:ContainerName"];


            // Read from the default consumer group: $Default
            string consumerGroup = EventHubConsumerClient.DefaultConsumerGroupName;

            // Create a blob container client that the event processor will use 
            BlobContainerClient storageClient = new BlobContainerClient(blobStorageConnectionString, blobContainerName);

            // Create an event processor client to process events in the event hub
            _processor = new EventProcessorClient(storageClient, consumerGroup, ehubNamespaceConnectionString, eventHubName);

            // Register handlers for processing events and handling errors
            _processor.ProcessEventAsync += ProcessEventHandler;
            _processor.ProcessErrorAsync += ProcessErrorHandler;
        }

        public async Task Start()
        {
            await _processor.StartProcessingAsync();
        }

        public async Task Stop()
        {
            //await Task.Delay(TimeSpan.FromSeconds(60));
            await _processor.StopProcessingAsync();
        }

        public event EventHandler<SensorDataReceivedEventArgs> SensorDataReceived;

        private async Task ProcessEventHandler(ProcessEventArgs eventArgs)
        {
            try
            {
                BinaryData bytes = eventArgs.Data.EventBody;
                string json = Encoding.UTF8.GetString(bytes);
                SensorData watchData = JsonConvert.DeserializeObject<SensorData>(json);

                SensorDataReceived?.Invoke(this, new SensorDataReceivedEventArgs(watchData));

                // Write the body of the event to the console window
                //Console.WriteLine("\tReceived event: {0}", Encoding.UTF8.GetString(eventArgs.Data.Body.ToArray()));

                // Update checkpoint in the blob storage so that the app receives only new events the next time it's run
                await eventArgs.UpdateCheckpointAsync(eventArgs.CancellationToken);
            }
            catch (Exception exc)
            {
                System.Console.WriteLine(exc.Message);
            }
        }

        static Task ProcessErrorHandler(ProcessErrorEventArgs eventArgs)
        {
            // Write details about the error to the console window
            Console.WriteLine($"\tPartition '{ eventArgs.PartitionId}': an unhandled exception was encountered. This was not expected to happen.");
            Console.WriteLine(eventArgs.Exception.Message);
            return Task.CompletedTask;
        }
    }

}
