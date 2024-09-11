# Use ASP.NET Core runtime as the base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Use the .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Copy the project file and restore dependencies
COPY ["MemberTrack.csproj", "."]
RUN dotnet restore "MemberTrack.csproj"

# Copy the rest of the application code
COPY . .
WORKDIR "/src/."

# Install frontend dependencies and build the React application
RUN cd ClientApp && npm install && npm run build

# Build the .NET application
RUN dotnet build "MemberTrack.csproj" -c Release -o /app/build

# Publish the .NET application
FROM build AS publish
RUN dotnet publish "MemberTrack.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Use the runtime image to run the application
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MemberTrack.dll"]
