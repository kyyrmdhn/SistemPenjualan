using System.Net;
using API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace API.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<Repository, Entity> : ControllerBase
        where Repository : class, IRepository<Entity, int>
        where Entity : class
    {
        private readonly Repository repository;
        public BaseController(Repository repository)
        {
            this.repository = repository;   
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var data = repository.GetAll();
                if (data.ToList().Count == 0)
                {
                    return Ok(new
                    {
                        StatusCode = HttpStatusCode.NotFound,
                        Message = "Data not found!"
                    });
                }
                else
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Data has been retrieved!",
                        Data = data
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    Message = ex.Message
                });
            }
        }
        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            try
            {
                var data = repository.GetById(id);
                if (data == null)
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Data not found!"
                    });
                }
                else
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Data has been retrieved!",
                        Data = data
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    Message = ex.Message
                });
            }
        }
        [HttpPost]
        public ActionResult Create(Entity entity)
        {
            try
            {
                var result = repository.Create(entity);
                if (result == 0)
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Failed to create data!"
                    });
                }
                else
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Data has been created!"
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    Message = ex.Message
                });
            }
        }
        [HttpPut]
        public ActionResult Update(Entity entity)
        {
            try
            {
                var result = repository.Update(entity);
                if (result == 0)
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Failed to update data!"
                    });
                }
                else
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Data has been updated!"
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    Message = ex.Message
                });
            }
        }
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            try
            {
                var result = repository.Delete(id);
                return Ok(new
                {
                    statusCode = HttpStatusCode.OK,
                    message = "Data has been deleted!"
                });
            }
            catch
            {
                return BadRequest(new
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "Failed to delete data!"
                });
            }
        }
    }
}
