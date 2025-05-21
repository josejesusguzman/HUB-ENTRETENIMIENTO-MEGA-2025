using APICuevana.Models;

namespace CuevanaAPI.Interfaces;

public interface IMovieRepository : IRepository<Movies>
{
    Task<IEnumerable<Movies>> GetByTitleAsync(string title);
}