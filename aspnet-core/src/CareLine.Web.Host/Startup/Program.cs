using System;
using Abp.AspNetCore.Dependency;
using Abp.Dependency;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace CareLine.Web.Host.Startup
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        internal static IHostBuilder CreateHostBuilder(string[] args) =>
            Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
                    webBuilder.UseUrls($"http://0.0.0.0:{port}");
                    webBuilder.UseStartup<Startup>();
                    //var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
                    //webBuilder.UseUrls($"http://localhost:{port}");
                })
                .UseCastleWindsor(IocManager.Instance.IocContainer);
    }
}
