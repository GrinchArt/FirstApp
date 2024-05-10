using Microsoft.AspNetCore.Http;
using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace FirstApp.Middleware
{
    public class AddCardListMiddleware
    {
        private readonly RequestDelegate _next;
        public AddCardListMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }
        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var code = HttpStatusCode.InternalServerError; 

            if (exception is MyNotFoundException) code = HttpStatusCode.NotFound; // 404
            else if (exception is MyUnauthorizedException) code = HttpStatusCode.Unauthorized; // 401
            var result = JsonSerializer.Serialize(new { error = exception.Message, stackTrace = exception.StackTrace });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            return context.Response.WriteAsync(result);
        }
    }
    public class MyNotFoundException : Exception
    {
        public MyNotFoundException(string message) : base(message) { }
    }

    public class MyUnauthorizedException : Exception
    {
        public MyUnauthorizedException(string message) : base(message) { }
    }
}
