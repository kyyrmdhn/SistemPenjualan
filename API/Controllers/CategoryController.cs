using System.Net;
using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController<CategoryRepository, Category>
    {
        private CategoryRepository repository;
        public CategoryController(CategoryRepository repository) : base(repository)
        {
            this.repository = repository;
        }
        [HttpPost("createData")]
        public ActionResult CreateData(Category category)
        {
            try
            {
                var cat = repository.CreateData(category);
                return cat switch
                {
                    "0" => Ok(new
                    {
                        StatusCode = HttpStatusCode.OK,
                        Data = category,
                        Message = "Data has been created!"
                    }),
                    "1" => BadRequest(new
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        Data = category,
                        Message = "Failed to create data. Name already exists!"
                    }),
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Message = ex.Message
                });
            }
        }
        [HttpPut("updateData")]
        public ActionResult UpdateData(Category category)
        {
            try
            {
                var cat = repository.UpdateData(category);
                return cat switch
                {
                    "0" => Ok(new
                    {
                        StatusCode = HttpStatusCode.OK,
                        Data = category,
                        Message = "Data has been updated!"
                    }),
                    "1" => BadRequest(new
                    {
                        StatusCode = HttpStatusCode.BadRequest,
                        Data = category,
                        Message = "Failed to update data. Name already exists!"
                    }),
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Message = ex.Message
                });
            }
        }
    }
}
