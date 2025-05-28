using System.Security.Cryptography;
using System.Text;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace APICuevana.Data
{
    public class UserService
    {
        private readonly string _connection;

        public UserService(IConfiguration config) => _connection = config.GetConnectionString("CuevanaAppDB")!;

        private string Hash(string pass)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(pass));
            return Convert.ToBase64String(bytes);
        }

        // Registrar a los usuarios
        public async Task<bool> RegistroAsync(string username, string password)
        {
            var hash = Hash(password);
            using var con = new SqlConnection(_connection);
            await con.OpenAsync();
            var cmd = new SqlCommand(
                "INSERT INTO Usuarios (Username, PasswordHash) VALUES (@user, @pass)", con
            );
            cmd.Parameters.AddWithValue("@user", username);
            cmd.Parameters.AddWithValue("@pass", hash);
            try
            {
                await cmd.ExecuteNonQueryAsync();
                return true;
            }
            catch (SqlException ex) when (ex.Number == 2627)
            {
                return false;
            }
        }


        // Login de usuarios


    }
}