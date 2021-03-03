using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SensorLearn.Common.Cosmos
{
    public class SensorDataQueries
    {
        public SensorDataQueries(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        private CosmosConnection _cosmosConnection = null;
        private CosmosConnection CC
        {
            get
            {
                if (_cosmosConnection == null)
                {
                    _cosmosConnection = new CosmosConnection(Configuration);
                }
                return _cosmosConnection;
            }
        }

        public IConfiguration Configuration { get; }

        public async Task<FilterValues> GetFilter()
        {
            string sql = "SELECT min(c.EventEnqueuedUtcTime) as MinDateTime, " + 
                "max(c.EventEnqueuedUtcTime) as MaxDateTime " +
                "FROM c";

            var query = new CosmosQuery<FilterValues>(CC.SensorLearnContainer);
            var result = await query.GetSingleResult(sql);
            return result;
        }

        public async Task<List<CosmosSensorData>> GetAllItems()
        {
            var query = new CosmosQuery<CosmosSensorData>(CC.SensorLearnContainer);
            var result = await query.GetAllItems();
            return result;
        }

        public async Task<List<CosmosSensorData>> GetAllItems(FilterValues filter)
        {
            var query = new CosmosQuery<CosmosSensorData>(CC.SensorLearnContainer);
            var result = await query.GetAllItems(filter);
            return result;
        }
    }
}
