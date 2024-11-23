using Microsoft.EntityFrameworkCore;
using PROJEKT_ZESPOLOWY_BACKEND.Data;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;

namespace PROJEKT_ZESPOLOWY_BACKEND.SqlRepository
{
    public class SqlRepository : ISqlRepository
    {
        private readonly ApplicationDbContext _context;

        public SqlRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<T>> GetAllAsync<T>() where T : BaseEntity
        {
            return await _context.Set<T>().ToListAsync();
        }
        public async Task<List<T>> GetAllViewAsync<T>() where T : class
        {
            return await _context.Set<T>().ToListAsync();
        }
        public async Task<T?> GetAsync<T>(Guid uuid) where T : BaseEntity
        {
            return await _context.Set<T>().FirstOrDefaultAsync(x => x.Uuid == uuid);
        }
        public IQueryable<T> GetQueryable<T>() where T : BaseEntity
        {
            return _context.Set<T>().AsQueryable();
        }
        public IQueryable<T> GetViewQueryable<T>() where T : class
        {
            return _context.Set<T>().AsQueryable();
        }
        public async Task AddAsync<T>(T entity) where T : BaseEntity
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.LastUpdatedAt = DateTime.UtcNow;
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync<T>(T entity) where T : BaseEntity, new()
        {
            var existingEntity = await _context.Set<T>().FindAsync(entity.Id);

            if (existingEntity == null)
                throw new InvalidOperationException($"Entity of type {typeof(T).Name} with Id {entity.Id} not found.");

            entity.LastUpdatedAt = DateTime.UtcNow;

            _context.Entry(existingEntity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync<T>(Guid uuid) where T : BaseEntity
        {
            var entity = await _context.Set<T>().FirstOrDefaultAsync(e => e.Uuid == uuid);

            if (entity == null)
                throw new InvalidOperationException($"Entity of type {typeof(T).Name} with Uuid {uuid} not found.");

            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }


        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
