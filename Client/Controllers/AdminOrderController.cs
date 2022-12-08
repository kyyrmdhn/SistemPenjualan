using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class AdminOrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
