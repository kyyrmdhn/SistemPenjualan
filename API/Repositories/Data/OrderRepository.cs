using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class OrderRepository : GeneralRepository<Order, int>
    {
        private readonly MyContext myContext;
        public OrderRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public int Delivery(DeliveryOrder deliveryOrder)
        {
            myContext.DeliveryOrders.Add(new DeliveryOrder
            {
                DeliveryDate = DateTime.UtcNow,
                Status = deliveryOrder.Status,
                OrderId = deliveryOrder.OrderId
            });
            var result = myContext.SaveChanges();
            return result;
        }
        public int DetailOrder(OrderDetail orderDetail)
        {/*
            var data = myContext.OrderDetails
                .Include(x => x.Order)
                .Include(x => x.Product)
                .SingleOrDefault();*/
            myContext.OrderDetails.Add(new OrderDetail
            {
                Id = orderDetail.Id,
                Qty = orderDetail.Qty,
                TotalPrice = orderDetail.TotalPrice,
                ProductId = orderDetail.ProductId
            });
            var result = myContext.SaveChanges();
            return result;
        }
        public int PaymentReceipt(PaymentReceipt paymentReceipt)
        {
            myContext.PaymentReceipts.Add(new PaymentReceipt
            {
                Id = paymentReceipt.Id,
                PaymentDate = DateTime.Now,
                PaymentMethod = paymentReceipt.PaymentMethod,
                OrderId = paymentReceipt.OrderId
            });
            var result = myContext.SaveChanges();
            return result;
        }
    }
}
