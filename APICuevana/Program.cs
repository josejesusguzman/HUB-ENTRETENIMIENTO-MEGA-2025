using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using APICuevana.Data;


var builder = WebApplication.CreateBuilder(args);

var conn = builder.Configuration.GetConnectionString("CuevanaAppDB")!;
builder.Services.AddDbContext<CuevanaAppDbContext>(opts =>
    opts.UseSqlServer(conn)
);

// Implementación de Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Cuevana API",
        Version = "v1"
    });
});
var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

