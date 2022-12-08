using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController<UserRepository, User>
    {
        private UserRepository repository;
        public UserController(UserRepository repository) : base(repository)
        {
            this.repository = repository;
        }
    }
}
