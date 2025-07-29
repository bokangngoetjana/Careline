# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files
COPY ["src/CareLine.Web.Host/CareLine.Web.Host.csproj", "src/CareLine.Web.Host/"]
COPY ["src/CareLine.Web.Core/CareLine.Web.Core.csproj", "src/CareLine.Web.Core/"]
COPY ["src/CareLine.Application/CareLine.Application.csproj", "src/CareLine.Application/"]
COPY ["src/CareLine.Core/CareLine.Core.csproj", "src/CareLine.Core/"]
COPY ["src/CareLine.EntityFrameworkCore/CareLine.EntityFrameworkCore.csproj", "src/CareLine.EntityFrameworkCore/"]

# Restore dependencies
RUN dotnet restore "src/CareLine.Web.Host/CareLine.Web.Host.csproj"

# Copy source code
COPY . .

# Publish app
WORKDIR "/src/src/CareLine.Web.Host"
RUN dotnet publish "CareLine.Web.Host.csproj" -c Release -o /publish --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "CareLine.Web.Host.dll"]
