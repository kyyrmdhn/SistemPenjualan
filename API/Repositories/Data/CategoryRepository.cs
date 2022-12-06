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
        public string CreateData(Category category)
        {
            var checkName = myContext.Categories.Any(x => x.Name == category.Name);
            if (checkName)
            {
                return "1";
            }
            else
            {
                myContext.Categories.Add(new Category { Name = category.Name });
                myContext.SaveChanges();
                return "0";
            }
        }
        public string UpdateData(Category category)
        {
            var checkName = myContext.Categories.Any(x => x.Name == category.Name);
            if (checkName)
            {
                return "1";
            }
            else
            {
                myContext.Set<Category>().Update(category);
                myContext.SaveChanges();
                return "0";
            }
        }

    }
}
