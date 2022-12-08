using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class AdminUserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
