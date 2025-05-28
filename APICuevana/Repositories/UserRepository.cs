
using APICuevana.Models;
using APICuevana.Interfaces;

namespace APICuevana.Repositories;

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

    public Task<bool> UpdateAsync(int id, Users entity)
    {
        throw new NotImplementedException();
    }
}