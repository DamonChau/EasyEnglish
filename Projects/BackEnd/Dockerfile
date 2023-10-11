FROM mcr.microsoft.com/dotnet/sdk:6.0 as build-env
WORKDIR /app
COPY EasyEnglishAPI/*.sln ./EasyEnglishAPI/
COPY EasyEnglishAPI/*.csproj ./EasyEnglishAPI/
COPY EasyEnglishAPIMockTests/*.csproj ./EasyEnglishAPIMockTests/
RUN dotnet restore ./EasyEnglishAPI/EasyEnglishAPI.sln

COPY . .
WORKDIR /app/EasyEnglishAPI
RUN dotnet publish -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0 as runtime
WORKDIR /app/EasyEnglishAPI
COPY --from=build-env /publish .
EXPOSE 5097
ENV ASPNETCORE_URLS=http://+:5097
ENTRYPOINT ["dotnet", "EasyEnglishAPI.dll"]