using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseController<ProductRepository, Product>
    {
        private ProductRepository repository;
        public ProductController(ProductRepository repository) : base(repository)
        {
            this.repository = repository;
        }
    }
}
