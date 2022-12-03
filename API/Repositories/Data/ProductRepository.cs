using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class ProductRepository : GeneralRepository<Product, int>
    {
        private readonly MyContext myContext;
        public ProductRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
    }
}
