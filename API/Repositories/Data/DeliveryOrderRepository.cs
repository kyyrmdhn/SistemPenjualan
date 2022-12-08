using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class DeliveryOrderRepository : GeneralRepository<DeliveryOrder, int>
    {
        private readonly MyContext myContext;
        public DeliveryOrderRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
    }
}
