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
    }
}
