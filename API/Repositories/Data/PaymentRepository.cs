using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class PaymentRepository : GeneralRepository<PaymentMethod, int>
    {
        private readonly MyContext myContext;
        public PaymentRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
    }
}
