using System.Net;
using API.Base;
using API.Context;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseController<ProductRepository, Product>
    {
        private ProductRepository repository;
        public IHostingEnvironment environment;
        private MyContext myContext;
        public ProductController(ProductRepository repository, IHostingEnvironment environment, MyContext myContext) : base(repository)
        {
            this.repository = repository;
            this.environment = environment;
            this.myContext = myContext;
        }

        /*[Produces("application/json")]*/
        [HttpPost("AddProduct")]
        public ActionResult<string> AddProduct([FromForm]Product product)
        {
            try
            {
                var data = myContext.Products.Add(new Product
                {
                    Name = product.Name,
                    Price = product.Price,
                    Stock = product.Stock,
                    Description = product.Description,
                    CreatedDate = DateTime.Now.Date,
                    CategoryId = product.CategoryId,
                });
                
                var files = HttpContext.Request.Form.Files;
                if (files != null/*files.Count > 0*/)
                {
                    foreach (var file in files)
                    {
                        FileInfo fileInfo = new FileInfo(file.FileName);
                        var newFileName = "Image_" + DateTime.Now.TimeOfDay.Milliseconds + fileInfo.Extension;
                        var path = Path.Combine("", environment.ContentRootPath + "\\Images\\" + newFileName);
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                        myContext.Products.Add(new Product
                        {
                            ProductPic = path
                        });
                    }
                }
                myContext.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Data has been created!",
                    Data = data
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    statusCode = HttpStatusCode.InternalServerError,
                    message = ex.Message
                });
            }
        }
    }
}
