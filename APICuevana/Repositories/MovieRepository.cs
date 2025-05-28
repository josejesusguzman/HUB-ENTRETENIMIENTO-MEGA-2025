using APICuevana.Data;
using APICuevana.Models;
using APICuevana.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace APICuevana.Repositories;

public class MovieRepository : IMovieRepository
{

    private readonly CuevanaAppDbContext _dbContext;

    public MovieRepository(CuevanaAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Movies> CreateAsync(Movies movie)
    {
        _dbContext.Movies.Add(movie);
        await _dbContext.SaveChangesAsync();
        return movie;
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

    public async Task<bool> UpdateAsync(int id, Movies movie)
    {
        _dbContext.Movies.Update(movie);
        return (await _dbContext.SaveChangesAsync()) > 0;
    }
}