using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using  APICuevana.Models;

namespace APICuevana.Data
{
    public class CuevanaAppDbContext : DbContext
    {
        public CuevanaAppDbContext(DbContextOptions<CuevanaAppDbContext> options) : base(options)
        { }

        public DbSet<Users> Users => Set<Users>();
        public DbSet<Movies> Movies => Set<Movies>();
        public DbSet<Favorites> Favorites => Set<Favorites>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Favorites>()
                .HasKey(f => new { f.UserId, f.MovieId });
        }

    }

}