namespace APICuevana.Models;
public class Favorites {
    public int      UserId       { get; set; }
    public Users     User         { get; set; } = null!;
    public int      MovieId      { get; set; }
    public Movies    Movie        { get; set; } = null!;
    public DateTime FavoritedAt  { get; set; } = DateTime.UtcNow;
}