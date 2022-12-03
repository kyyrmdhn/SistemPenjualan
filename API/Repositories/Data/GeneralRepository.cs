using API.Context;
using API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.Data
{
    public class GeneralRepository<Entity, Key> : IRepository<Entity, Key>
        where Entity : class
    {
        private readonly MyContext myContext;
        private readonly DbSet<Entity> entities;
        public GeneralRepository(MyContext myContext)
        {
            this.myContext = myContext;
            entities = myContext.Set<Entity>();
        }
        public int Create(Entity entity)
        {
            entities.Add(entity);
            return myContext.SaveChanges();
        }

        public int Delete(Key id)
        {
            myContext.Remove(entities.Find(id));
            return myContext.SaveChanges();
        }

        public IEnumerable<Entity> GetAll()
        {
            return entities.ToList();
        }

        public Entity GetById(Key id)
        {
            return entities.Find(id);
        }

        public int Update(Entity entity)
        {
            entities.Update(entity);
            return myContext.SaveChanges();
        }
    }
}
