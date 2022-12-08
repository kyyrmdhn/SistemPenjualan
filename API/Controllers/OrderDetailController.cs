using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : BaseController<OrderDetailRepository, OrderDetail>
    {
        private OrderDetailRepository repository;
        public OrderDetailController(OrderDetailRepository repository) : base(repository)
        {
            this.repository = repository;
        }
    }
}
