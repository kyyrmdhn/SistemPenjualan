using System.Diagnostics;
using Client.Models;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class HomeUserController : Controller
    {
        private readonly ILogger<HomeUserController> _logger;

        public HomeUserController(ILogger<HomeUserController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}