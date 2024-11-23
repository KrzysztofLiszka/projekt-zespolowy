using Microsoft.EntityFrameworkCore;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;

namespace PROJEKT_ZESPOLOWY_BACKEND.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {}

        public DbSet<Workplace> Workplaces { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
