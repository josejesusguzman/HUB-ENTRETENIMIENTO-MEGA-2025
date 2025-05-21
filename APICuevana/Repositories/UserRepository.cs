
using APICuevana.Models;
using CuevanaAPI.Interfaces;

namespace CuevanaAPI.Repositories;

public class UserRepository : IRepository<Users>
{
    public Task<Users> CreateAsync(Users entity)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Users>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Users?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAsync(Users entity)
    {
        throw new NotImplementedException();
    }
}