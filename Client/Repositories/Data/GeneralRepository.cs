using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Client.Base;
using Client.Repositories.Interface;
using Newtonsoft.Json;

namespace Client.Repositories.Data
{
    public class GeneralRepository<Entity, Key> : IRepository<Entity, Key>
		where Entity : class
	{
		public readonly Address address;
		public readonly string request;
		public readonly IHttpContextAccessor contextAccessor;
		public readonly HttpClient httpClient;
		public GeneralRepository(Address address, string request)
		{
			this.address = address;
			this.request = request;
			contextAccessor = new HttpContextAccessor();
			httpClient = new HttpClient
			{
				BaseAddress = new Uri(address.link)
			};
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", contextAccessor.HttpContext.Session.GetString("JWToken"));
        }

		public async Task<object> Create(Entity entity)
		{
            StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
            using (var result = httpClient.PostAsync(address.link + request, content).Result)
            {
                string apiResponse = await result.Content.ReadAsStringAsync();
                entity = JsonConvert.DeserializeObject<Entity>(apiResponse);
            }
            return entity;
        }

		public HttpStatusCode Delete(Key id)
		{
            var result = httpClient.DeleteAsync(request + id).Result;
            return result.StatusCode;
        }

		public async Task<object> Get()
		{
            List<Entity> entities = new List<Entity>();

            using (var response = await httpClient.GetAsync(request))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entities = JsonConvert.DeserializeObject<List<Entity>>(apiResponse);
            }
            return entities;
        }

		public async Task<object> GetById(Key id)
		{
            Entity entity;

            using (var response = await httpClient.GetAsync(request + id))
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                entity = JsonConvert.DeserializeObject<Entity>(apiResponse);
            }
            return entity;
        }

		public HttpStatusCode Update(Entity entity, Key id)
		{
            StringContent content = new StringContent(JsonConvert.SerializeObject(entity), Encoding.UTF8, "application/json");
            var result = httpClient.PutAsync(request + id, content).Result;
            return result.StatusCode;
        }
	}
}
