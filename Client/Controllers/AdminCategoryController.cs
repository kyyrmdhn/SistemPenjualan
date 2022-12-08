using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class AdminCategoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
