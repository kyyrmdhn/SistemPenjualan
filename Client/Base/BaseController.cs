using Client.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Client.Base
{
    public class BaseController<Entity, Repository, Key> : Controller
		where Entity : class
		where Repository : IRepository<Entity, Key>
	{
		private readonly Repository repository;
		public BaseController(Repository repository)
		{
			this.repository = repository;
		}
        [HttpGet]
        public async Task<JsonResult> GetAll()
        {
            var result = await repository.Get();
            return Json(result);
        }

        [HttpGet]
        public async Task<JsonResult> Get(Key id)
        {
            var result = await repository.GetById(id);
            return Json(result);
        }

        [HttpPost]
        public JsonResult Post(Entity entity)
        {
            var result = repository.Create(entity);
            return Json(result);
        }

        [HttpPut]
        public JsonResult Put(Entity entity, Key id)
        {
            var result = repository.Update(entity, id);
            return Json(result);
        }

        [HttpDelete]
        public JsonResult Delete(Key id)
        {
            var result = repository.Delete(id);
            return Json(result);
        }
    }
}
