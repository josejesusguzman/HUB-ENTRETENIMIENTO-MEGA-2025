using APICuevana.Data;
using APICuevana.Models;
using CuevanaAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CuevanaAPI.Repositories;

public class MovieRepository : IMovieRepository
{

    private readonly CuevanaAppDbContext _dbContext;

    public MovieRepository(CuevanaAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Movies> CreateAsync(Movies entity)
    {
        _dbContext.Movies.Add(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Movies>> GetAllAsync() => await _dbContext.Movies.ToListAsync();

    public async Task<Movies?> GetByIdAsync(int id) => await _dbContext.Movies.FindAsync(id);

    public async Task<IEnumerable<Movies>> GetByTitleAsync(string title) =>
        await _dbContext.Movies
            .Where(m => m.Title.Contains(title))
            .ToListAsync();

    public Task<bool> UpdateAsync(Movies entity)
    {
        throw new NotImplementedException();
    }
}