using PROJEKT_ZESPOLOWY_BACKEND.Entities;

namespace PROJEKT_ZESPOLOWY_BACKEND.SqlRepository
{
    public interface ISqlRepository
    {
        Task<List<T>> GetAllAsync<T>() where T : BaseEntity;
        Task<List<T>> GetAllViewAsync<T>() where T : class;
        Task<T?> GetAsync<T>(Guid uuid) where T : BaseEntity;
        IQueryable<T> GetQueryable<T>() where T : BaseEntity;
        IQueryable<T> GetViewQueryable<T>() where T : class;
        Task AddAsync<T>(T entity) where T : BaseEntity;
        Task UpdateAsync<T>(T entity) where T : BaseEntity, new();
        Task DeleteAsync<T>(Guid uuid) where T : BaseEntity;
        Task SaveChangesAsync();
    }
}
