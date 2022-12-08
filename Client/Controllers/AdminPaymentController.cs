using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class AdminPaymentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
