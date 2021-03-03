using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SensorLearn.Common;
using SensorLearn.Common.Cosmos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SensorLearn.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SensorDataController : ControllerBase
    {
        private readonly ILogger<SensorDataController> _logger;
        private readonly SensorDataQueries _queries;

        public SensorDataController(ILogger<SensorDataController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _queries = new SensorDataQueries(configuration);
        }

        [HttpGet("/GetFilter")]
        public async Task<FilterValues> GetFilter()
        {
            string message = $"GetFilter() called at {DateTime.UtcNow.ToLongTimeString()}";
            _logger.LogInformation(message);

            var result = await _queries.GetFilter();
            return result;
        }

        [HttpGet("/GetAllSensorData")]
        public async Task<IEnumerable<CosmosSensorData>> GetAllSensorData()
        {
            string message = $"GetAllSensorData() called at {DateTime.UtcNow.ToLongTimeString()}";
            _logger.LogInformation(message);

            var result = await _queries.GetAllItems();
            return result;
        }

        [HttpGet("/GetFilteredSensorData")]
        public async Task<IEnumerable<CosmosSensorData>> GetFilteredSensorData(string minDateTime = null, string maxDateTime = null)
        {
            string message = $"GetFilteredSensorData() called at {DateTime.UtcNow.ToLongTimeString()}";
            _logger.LogInformation(message);

            FilterValues filter = new FilterValues();

            if (minDateTime != null)
            {
                filter.MinDateTime = minDateTime;
            }

            if (maxDateTime != null)
            {
                filter.MaxDateTime = maxDateTime;
            }

            var result = await _queries.GetAllItems(filter);
            return result;
        }
    }
}
