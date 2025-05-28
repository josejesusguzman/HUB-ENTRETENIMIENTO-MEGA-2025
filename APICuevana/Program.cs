using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using APICuevana.Data;
using APICuevana.Interfaces;
using APICuevana.Repositories;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);

var conn = builder.Configuration.GetConnectionString("CuevanaAppDB")!;
builder.Services.AddDbContext<CuevanaAppDbContext>(opts =>
    opts.UseSqlServer(conn)
);

var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtKey"]!);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opts =>
    {
        opts.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

// Registro del repositorio
builder.Services.AddScoped<IMovieRepository, MovieRepository>();
builder.Services.AddScoped<UserService>();

builder.Services.AddControllers();

// Implementación de Swagger
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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

