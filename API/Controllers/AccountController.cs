using System.Net;
using API.Context;
using API.Repositories.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public AccountRepository accountRepository;
        private readonly MyContext myContext;
        public AccountController(AccountRepository accountRepository, MyContext myContext)
        {
            this.accountRepository = accountRepository;
            this.myContext = myContext;
        }
        [HttpPost("login")]
        public ActionResult Login(LoginVM loginVM)
        {
            try
            {
                var login = accountRepository.Login(loginVM);
                return login switch
                {
                    "1" => BadRequest(new
                    {
                        statusCode = HttpStatusCode.BadRequest,
                        result = loginVM,
                        message = "Login Failed. Wrong Password!"
                    }),
                    "2" => BadRequest(new
                    {
                        statusCode = HttpStatusCode.BadRequest,
                        result = loginVM,
                        message = "Login Failed. Email Not Found!"
                    }),
                    _ => Ok(new
                    {
                        statusCode = HttpStatusCode.OK,
                        login,
                        message = "Login Successfull!"
                    })
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    message = ex.Message
                });
            }
        }

        [HttpPost("register")]
        public ActionResult Register(RegisterVM registerVM)
        {
            try
            {
                int register = accountRepository.Register(registerVM);
                return register switch
                {
                    0 => Ok(new
                    {
                        statusCode = HttpStatusCode.OK,
                        result = registerVM,
                        message = "Register Successfull!"
                    }),
                    1 => BadRequest(new
                    {
                        statusCode = HttpStatusCode.BadRequest,
                        result = registerVM,
                        message = "Register Failed. Email already exists!"
                    }),
                    2 => BadRequest(new
                    {
                        statusCode = HttpStatusCode.BadRequest,
                        result = registerVM,
                        message = "Register Failed. Phone already exists!"
                    })
                };
            }
            catch(Exception ex)
            {
                return StatusCode(500, new
                {
                    statusCode = HttpStatusCode.InternalServerError,
                    message = ex.Message
                });
            }
        }

        /*[HttpPost("forgotpassword")]
        public ActionResult ForgotPassword(ForgotPasswordVM forgotPasswordVM)
        {
            try
            {
                var entry = accountRepository.ForgotPassword(forgotPasswordVM);
                return entry switch
                {
                    0 => Ok(new { status = HttpStatusCode.OK, result = emailVM, message = "New Password Request Successfull. Verification email has been sent." }),
                    1 => BadRequest(new { status = HttpStatusCode.BadRequest, result = emailVM, message = "Request Failed. Email Not Found!" }),
                    2 => BadRequest(new { status = HttpStatusCode.BadRequest, result = emailVM, message = "Request Failed. Email Found but cant send verification code!" }),
                    _ => BadRequest(new { status = HttpStatusCode.BadRequest, message = "Request Failed!" })

                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = HttpStatusCode.InternalServerError, message = ex.Message });
            }
        }*/
    }
}
