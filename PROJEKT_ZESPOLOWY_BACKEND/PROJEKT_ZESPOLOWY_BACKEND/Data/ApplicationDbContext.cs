using Microsoft.EntityFrameworkCore;

namespace PROJEKT_ZESPOLOWY_BACKEND.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
