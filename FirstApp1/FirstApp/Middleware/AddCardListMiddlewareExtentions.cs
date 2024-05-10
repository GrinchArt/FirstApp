namespace FirstApp.Middleware
{
    public static class AddCardListMiddlewareExtentions
    {
        public static IApplicationBuilder UseAddCardListMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AddCardListMiddleware>();
        }
    }
}
