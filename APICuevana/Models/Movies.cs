namespace APICuevana.Models;
public class Movies
{
    public int id { get; set; }
    public string Title { get; set; } = null!;
    public string? Overview { get; set; }
    public string? PosterPath { get; set; }
    public DateTime? ReleaseDate { get; set; }
    public decimal? VoteAverage { get; set; }

}