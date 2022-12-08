using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminPaymentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
