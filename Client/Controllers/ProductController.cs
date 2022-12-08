using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
