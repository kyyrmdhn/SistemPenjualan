using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class OrderDetailRepository : GeneralRepository<OrderDetail, int>
    {
        private readonly MyContext myContext;
        public OrderDetailRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
    }
}
