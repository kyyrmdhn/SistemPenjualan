using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class CategoryRepository : GeneralRepository<Category, int>
    {
        private readonly MyContext myContext;
        public CategoryRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
    }
}
