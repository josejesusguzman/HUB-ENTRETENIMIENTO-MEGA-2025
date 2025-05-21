namespace APICuevana.Models;

public class Users
{
    public int id { get; set; }
    public string Username { get; set; } = null!;
    public byte[] PasswordHash { get; set; } = null!;
    public DateTime CreatedAt { get; set; }

    // Encapsulamiento
    // Getter y Setter


}