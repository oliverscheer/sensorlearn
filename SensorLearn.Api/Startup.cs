using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SensorLearn.Api.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchData.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSignalR();
            services.AddCors(o =>
            {
                o.AddPolicy("CorsPolicy",
                    builder =>
                    {
                        builder
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:4200", "https://localhost:4200");
                        //.WithHeaders("authorization", "accept", "content-type", "origin");

                        //.WithHeaders("Access-Control-Allow-Credential", "authorization", "accept", "content-type", "origin");
                    });

                //options.AddPolicy("AllowAll", p =>
                //{
                //    //p.AllowAnyOrigin()
                //    //.AllowAnyHeader()
                //    //.AllowAnyMethod();

                //    p.AllowAnyMethod()
                //    .AllowAnyHeader()
                //    .AllowCredentials();
                //});
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<SensorDataHub>("/sensorhub");
                endpoints.MapHub<FakeSensorDataHub>("/fakesensorhub");
                endpoints.MapControllers();
            });
        }
    }
}
