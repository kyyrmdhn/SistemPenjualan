using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryOrderController : BaseController<DeliveryOrderRepository, DeliveryOrder>
    {
        private DeliveryOrderRepository repository;
        public DeliveryOrderController(DeliveryOrderRepository repository) : base(repository)
        {
            this.repository = repository;
        }
    }
}
