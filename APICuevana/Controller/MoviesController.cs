using APICuevana.Interfaces;
using APICuevana.Models;
using Microsoft.AspNetCore.Mvc;

namespace APICuevana.Controllers;

[ApiController]
[Route("api/[controller]")] // api/movies
public class MoviesController : ControllerBase
{
    private readonly IMovieRepository _repo;

    public MoviesController(IMovieRepository repo)
    {
        _repo = repo;
    }

    [HttpGet] // GET api/movies
    public async Task<IActionResult> GetAll()
        => Ok(await _repo.GetAllAsync());

    [HttpGet("{id:int}")] // GET api/movies/1
    public async Task<IActionResult> Get(int id)
    {
        var response = await _repo.GetByIdAsync(id);
        return response is null ? NotFound() : Ok(response);
    }

    [HttpPost] // POST api/movies
    public async Task<IActionResult> Create(Movies movie)
    {
        var created = await _repo.CreateAsync(movie);
        return CreatedAtAction(nameof(Get), new { id = created.id }, created);
    }

    [HttpPut("{id}")] // PUT api/movies/1
    public async Task<IActionResult> Update(int id, Movies movie)
    {
        var response = await _repo.UpdateAsync(id, movie);
        return response ? NoContent() : NotFound(); 
    }

}