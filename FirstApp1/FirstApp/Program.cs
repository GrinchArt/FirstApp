using FirstApp.Data;
using FirstApp.Data.AutoMapper;
using FirstApp.Data.Dto;
using FirstApp.Data.Validator;
using FirstApp.Middleware;
using FirstApp.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;



namespace FirstApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            builder.Services.AddDbContext<AppDbContext>(options=>
            options.UseNpgsql(builder.Configuration.GetConnectionString("AppDbContext")));


            builder.Services.AddScoped<IListsRepository, AppDbRepository>();
            builder.Services.AddScoped<ICardsRepository, AppDbRepository>();
            builder.Services.AddScoped<IActivitiesRepository, AppDbRepository>();

            builder.Services.AddScoped<IValidator<Card>,CardValidator>();
            builder.Services.AddScoped<IValidator<FirstApp.Models.List>, ListValidator>();

            builder.Services.AddScoped<IValidator<ListDto>, ListDtoValidator>();
            builder.Services.AddScoped<IValidator<CardDto>, CardDtoValidator>();

            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
            builder.Services.AddControllers();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            app.UseRouting();
            app.UseAuthorization();
            app.UseCors("AllowAll");
            app.UseAddCardListMiddleware();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); 
            });
            var summaries = new[]
            {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };

            app.MapGet("/weatherforecast", (HttpContext httpContext) =>
            {
                var forecast = Enumerable.Range(1, 5).Select(index =>
                    new WeatherForecast
                    {
                        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                        TemperatureC = Random.Shared.Next(-20, 55),
                        Summary = summaries[Random.Shared.Next(summaries.Length)]
                    })
                    .ToArray();
                return forecast;
            });

            app.Run();
        }
    }
}
