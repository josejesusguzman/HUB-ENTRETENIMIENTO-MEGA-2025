using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using APICuevana.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace APICuevana.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;
    private readonly IConfiguration _config;

    public AuthController(UserService userService, IConfiguration config)
    {
        _userService = userService;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UsuarioDto user)
    {
        var valido = await _userService.RegistroAsync(user.Username, user.Password);
        if (!valido) return Conflict(new { message = "El usuario ya existe" });
        var token = GenerateToken(user.Username);
        return Ok(new { token });
    }

    private string GenerateToken(string username)
    {
        var key = Encoding.ASCII.GetBytes(_config["JwtKey"]!);
        var claims = new[] {
            new Claim(ClaimTypes.Name, username)
        };
        var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
        var jwt = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials
        );
        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }

}

public class UsuarioDto
{
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
}