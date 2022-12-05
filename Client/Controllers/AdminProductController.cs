using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class AdminProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
