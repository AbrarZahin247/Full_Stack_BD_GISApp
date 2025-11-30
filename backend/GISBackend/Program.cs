using GisBackend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Controllers
builder.Services.AddControllers();

// 2. Add Database
builder.Services.AddDbContext<GisDbContext>(options =>
    options.UseSqlite("Data Source=gis.db"));

// 3. Add CORS (To allow React to connect)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// 4. Configure Pipeline
// app.UseHttpsRedirection(); // Disabled for local development

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();