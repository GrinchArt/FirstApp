
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5198


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["FirstApp/FirstApp.csproj", "FirstApp/"]
RUN dotnet restore "FirstApp/FirstApp.csproj"


COPY ["FirstApp/", "FirstApp/"]
WORKDIR "/src/FirstApp"
RUN dotnet build "FirstApp.csproj" -c Release -o /app/build


FROM build AS publish
RUN dotnet publish "FirstApp.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FirstApp.dll"]
