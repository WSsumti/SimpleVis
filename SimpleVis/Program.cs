using SimpleVis.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddTransient<IRamenRatingsRepository, RamenRatingsRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(option => option.WithOrigins("http://127.0.0.1:5500").AllowAnyMethod());

app.UseAuthorization();

app.MapControllers();

app.Run();
