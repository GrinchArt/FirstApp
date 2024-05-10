using FirstApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FirstApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<List> Lists { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<ActivityLog> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<List>()
            .HasMany(x => x.Cards)
            .WithOne(x => x.List)
            .HasForeignKey(x => x.ListId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
