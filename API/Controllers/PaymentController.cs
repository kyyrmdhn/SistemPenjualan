using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : BaseController<PaymentRepository, PaymentMethod>
    {
        private readonly PaymentRepository repository;
        public PaymentController(PaymentRepository repository) : base(repository)
        {
            this.repository = repository;
        }
    }
}
