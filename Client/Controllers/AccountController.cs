using API.Models;
using Client.Base;
using Client.Repositories.Data;
using Client.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class AccountController : BaseController<User, AccountRepository, int>
    {
        private readonly AccountRepository repository;
        public AccountController(AccountRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        [HttpPost]
        public JsonResult Register(RegisterVM registerVM)
        {
            var result = repository.Register(registerVM);
            return Json(result);
        }
        [HttpPost]
        public JsonResult Login(LoginVM loginVM)
        {
            var result = repository.Login(loginVM);
            return Json(result);
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }
        public IActionResult Register()
        {
            return View();
        }
    }
}
