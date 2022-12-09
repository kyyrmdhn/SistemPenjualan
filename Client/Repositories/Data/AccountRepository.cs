using System.Text;
using API.Models;
using Client.Base;
using Client.ViewModels;
using Newtonsoft.Json;

namespace Client.Repositories.Data
{
    public class AccountRepository : GeneralRepository<User, int>
	{
		public AccountRepository(Address address) : base(address, "Account/")
		{
		}
       /* public HttpStatusCode Register(RegisterVM registerVM)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(registerVM), Encoding.UTF8, "application/json");
            var result = httpClient.PostAsync(address.link + request + "register/", content).Result;
            return result.StatusCode;
        }*/

        public async Task<Object> Login(LoginVM loginVM)
        {
            Object entities = null;
            StringContent content = new StringContent(JsonConvert.SerializeObject(loginVM), Encoding.UTF8, "application/json");
            using (var response = await httpClient.PostAsync(request + "login", content))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject(apiResponse);
            }

            return entities;
        }
        public async Task<JwtTokenVM> Auth(LoginVM login)
        {
            JwtTokenVM token = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(login), Encoding.UTF8, "application/json");
            var result = await httpClient.PostAsync(request + "login", content);

            string apiResponse = await result.Content.ReadAsStringAsync();
            token = JsonConvert.DeserializeObject<JwtTokenVM>(apiResponse);

            return token;
        }
    }
}
