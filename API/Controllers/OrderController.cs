using System.Net;
using API.Base;
using API.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : BaseController<OrderRepository, Order>
    {
        private readonly OrderRepository repository;
        public OrderController(OrderRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        [HttpPost("delivery")]
        public ActionResult Delivery(DeliveryOrder deliveryOrder)
        {
            try
            {
                var result = repository.Delivery(deliveryOrder);
                if (result != 0)
                {
                    return Ok(new
                    {
                        statusCode = HttpStatusCode.OK,
                        result = deliveryOrder,
                        message = "Success create delivery order!"
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        statusCode = HttpStatusCode.BadRequest,
                        message = "Failed to create delivery order!"
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    message = ex.Message
                });
            }
        }

        [HttpPost("detailOrder")]
        public ActionResult DetailOrder(OrderDetail orderDetail)
        {
            var result = repository.DetailOrder(orderDetail);
            if (result != 0)
            {
                return Ok(new
                {
                    orderDetail
                });
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("paymentReceipt")]
        public ActionResult Payment(PaymentReceipt paymentReceipt)
        {
            var result = repository.PaymentReceipt(paymentReceipt);
            if (result != 0)
            {
                return Ok(new
                {
                    paymentReceipt
                });
            } 
            else
            {
                return BadRequest();
            }
        }
    }
}
