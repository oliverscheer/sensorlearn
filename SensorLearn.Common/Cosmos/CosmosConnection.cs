using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Configuration;

namespace SensorLearn.Common.Cosmos
{
    public class CosmosConnection
    {
        
        public CosmosConnection(IConfiguration configuration)
        {
            string databaseId = configuration["CosmosDb:DatabaseId"];//  "Endpoint=sb://garmin.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=NqLHCXO/N3MfWufwGwQLOr6Tcqxqh0rUXG3eIJf0xG4=";
            string containerName = configuration["CosmosDb:ContainerName"];
            string connectionString = configuration["CosmosDb:ConnectionString"];

            this.CosmosClient = new CosmosClient(connectionString);
            this.SensorLearnContainer = this
                .CosmosClient
                .GetDatabase(databaseId)
                .GetContainer(containerName);

        }

        public CosmosClient CosmosClient { get; }
        public Container SensorLearnContainer { get; }
    }
}
