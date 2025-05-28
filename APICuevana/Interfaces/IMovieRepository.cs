using APICuevana.Models;

namespace APICuevana.Interfaces;

public interface IMovieRepository : IRepository<Movies>
{
    Task<IEnumerable<Movies>> GetByTitleAsync(string title);
}