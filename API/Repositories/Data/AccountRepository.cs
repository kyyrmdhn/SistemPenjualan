using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Handlers;
using API.Context;
using API.Models;
using API.ViewModel;
using API.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Repositories.Data
{
    public class AccountRepository 
    {
        private readonly MyContext myContext;
        public IConfiguration configuration;
        public AccountRepository(MyContext myContext, IConfiguration configuration)
        {
            this.myContext = myContext;
            this.configuration = configuration;
        }
        public string Login(LoginVM loginVM)
        {
            var checkEmail = myContext.Users.SingleOrDefault(x => x.Email.Equals(loginVM.Email));
            if (checkEmail != null)
            {
                if (Hashing.ValidatePassword(loginVM.Password, checkEmail.Password))
                {
                    var roles = (from user in myContext.Users
                                 join role in myContext.Roles on user.Role.Id equals role.Id
                                 where user.Email == loginVM.Email
                                 select new
                                 {
                                     roles = role.Name
                                 });
                    var claims = new List<Claim>();
                    claims.Add(new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]));
                    claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
                    claims.Add(new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToString()));
                    claims.Add(new Claim("Email", loginVM.Email));
                    foreach (var item in roles)
                    {
                        claims.Add(new Claim("roles", item.roles));
                    }
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        configuration["Jwt:Issuer"],
                        configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.Now.AddMinutes(10),
                        signingCredentials: signIn);
                    var idToken = new JwtSecurityTokenHandler().WriteToken(token);
                    claims.Add(new Claim("TokenSecurity", idToken.ToString()));
                    return idToken;
                }
                else
                {
                    return "1";
                }
            }
            else
            {
                return "2";
            }
        }
        public int Register(RegisterVM registerVM)
        {
            var checkEmail = myContext.Users.Any(x => x.Email == registerVM.Email);
            var checkPhone = myContext.Users.Any(x => x.PhoneNumber == registerVM.PhoneNumber);
            if (checkEmail)
            {
                return 1;
            } 
            else if(checkPhone)
            {
                return 2;
            }
            else 
            {
                myContext.Users.Add(new User()
                {
                    Name = registerVM.Name,
                    Address = registerVM.Address,
                    PhoneNumber = registerVM.PhoneNumber,
                    Email = registerVM.Email,
                    Password = Hashing.HashPassword(registerVM.Password),
                    CreatedDate = DateTime.Now,
                    RoleId = registerVM.RoleId,
                });
                //var result = myContext.SaveChanges();
                /*if (result > 0)*/
                //var id = myContext.Users.SingleOrDefault(x => x.Email.Equals(registerVM.Email)).Id;
                myContext.SaveChanges();
                return 0;
            }
        }
        public int ForgotPassword(ForgotPasswordVM forgotPasswordVM)
        {
            var data = myContext.Users
                .SingleOrDefault(x => x.Email.Equals(forgotPasswordVM.Email) && x.Name.Equals(forgotPasswordVM.Name));
            if (data != null)
            {
                if (forgotPasswordVM.NewPass == forgotPasswordVM.ConfPass)
                {
                    data.Password = Hashing.HashPassword(forgotPasswordVM.ConfPass);
                    myContext.Entry(data).State = EntityState.Modified;
                    var resultUser = myContext.SaveChanges();
                    if (resultUser > 0)
                    {
                        return resultUser;
                    }
                }
            }
            return 0;
        }
        /*public int ChangePassword(ChangePasswordVM changePasswordVM)
        {
            var data = myContext.Users
               .Include(x => x.Role)
               .SingleOrDefault(x => x.Employee.Email.Equals(changePasswordVM.Email));
            var validate = Hashing.ValidatePassword(changePasswordVM.Password, data.Password);
            if (data != null && validate)
            {
                data.Password = Hashing.HashPassword(changePasswordVM.NewPass);
                myContext.Entry(data).State = EntityState.Modified;
                var resultUser = myContext.SaveChanges();
                if (resultUser > 0)
                {
                    return resultUser;
                }
            }
            return 0;
        }*/
    }
}
