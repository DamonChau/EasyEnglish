using Microsoft.EntityFrameworkCore;
using EasyEnglishAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<EasyEnglishContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("EEDatabase")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(p => p.AddPolicy("corsappDev", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddCors(p => p.AddPolicy("corsappPrd", builder =>
{
    builder.WithOrigins("https://easyenglish.azurewebsites.net/").AllowAnyMethod().AllowAnyHeader();
}));


var app = builder.Build();
app.UseSwagger();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{   
    app.UseSwaggerUI();
    app.UseCors("corsappDev");
}
else
{
    app.UseCors("corsappPrd");
}

app.UseAuthorization();

app.MapControllers();

app.Run();
