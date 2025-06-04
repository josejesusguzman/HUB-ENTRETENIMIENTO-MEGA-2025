using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using APICuevana.Data;
using APICuevana.Interfaces;
using APICuevana.Repositories;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);

// Leer el origin permitido desde el appsettings
var allowedOrigin = builder.Configuration["Cors:AllowedOrigin"]
    ?? "http://localhost:5000";

builder.Services.AddCors( options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigin)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

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
builder.Services.AddSwaggerGen();
var app = builder.Build();

app.UseCors("FrontendPolicy");


// Middleware

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();

