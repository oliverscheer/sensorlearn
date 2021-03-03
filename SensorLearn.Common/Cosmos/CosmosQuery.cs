using Microsoft.Azure.Cosmos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SensorLearn.Common.Cosmos
{
    public class CosmosQuery<T>
    {
        private readonly Container container;

        public CosmosQuery(Container container)
        {
            this.container = container;
        }

        internal async Task<List<T>> GetAllItems(FilterValues filter = null)
        {
            var sql = "SELECT TOP 300 * FROM c ";
            //bool andRequired = false;
            //bool whereRequired = true; 

            if (filter == null)
            {
                filter = new FilterValues();
            }

            if (filter.MinDateTime != null && filter.MaxDateTime != null)
            {
                sql += "where c.EventEnqueuedUtcTime between @mindatetime and @maxdatetime";
                //andRequired = true;
                //whereRequired = false;
            }

            sql += " order by c.EventEnqueuedUtcTime desc";

            QueryDefinition query = new QueryDefinition(sql);
            if (filter.MinDateTime != null && filter.MaxDateTime != null)
            {
                query.WithParameter("@mindatetime", filter.MinDateTime);
                query.WithParameter("@maxdatetime", filter.MaxDateTime);
            }

            var result = await GetAllItems(query);
            return result;
        }


        public async Task<List<T>> GetAllItems(QueryDefinition queryDefinition)
        {
            var container = this.container;
            List<T> result = new List<T>();

            using (FeedIterator<T> feedIterator = container.GetItemQueryIterator<T>(queryDefinition))
            {
                while (feedIterator.HasMoreResults)
                {
                    foreach (var item in await feedIterator.ReadNextAsync())
                    {
                        result.Add(item);
                    }
                }
            };

            return result;
        }

        public async Task<T> GetSingleResult(string sql)
        {
            var container = this.container;

            List<T> result = new List<T>();

            using (FeedIterator<T> feedIterator = container.GetItemQueryIterator<T>(sql))
            {
                while (feedIterator.HasMoreResults)
                {
                    foreach (var item in await feedIterator.ReadNextAsync())
                    {
                        result.Add(item);
                    }
                }
            };

            return result[0];
        }

    }
}
