using System.Net;

namespace Client.Repositories.Interface
{
    public interface IRepository<Entity, Key> where Entity : class
	{
        Task<Object> Get();
        Task<Object> GetById(Key id);
        Task<Object> Create(Entity entity);
        HttpStatusCode Update(Entity entity, Key id);
        HttpStatusCode Delete(Key id);
    }
}
