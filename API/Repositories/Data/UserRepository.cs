using API.Context;
using API.Models;

namespace API.Repositories.Data
{
    public class UserRepository : GeneralRepository<User, int>
    {
        private readonly MyContext myContext;
        public UserRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }
    }
}
