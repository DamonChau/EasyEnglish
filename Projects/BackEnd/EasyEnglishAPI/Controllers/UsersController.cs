using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace EasyEnglishAPI.Controllers
{
    public class UsersController : Controller
    {

        private readonly UserDAL _objectuser;

        public UsersController(EasyEnglishContext context)
        {
            _objectuser = new UserDAL(context);
        }

        [HttpPost]
        [Route("api/Users/login")]
        public async Task<ActionResult<User>> Login([FromBody] User u)
        {
            try
            {
                if (_objectuser is not null)
                {
                    User? r = await _objectuser.Login(u);

                    if (r != null)
                        return Ok(new { token = GenerateJSONWebToken(r), user = r });
                    return BadRequest(new { error = "The username or password provided were incorrect!" });
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        private string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("This is my custom Secret key for authentication"));
            var credentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken("EasyEnglish",
              "EasyEnglish",
              null,
              expires: DateTime.Now.AddMinutes(1),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public bool ValidateCurrentToken(string token)
        {
            var mySecret = "This is my custom Secret key for authentication";
            var mySecurityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.ASCII.GetBytes(mySecret));

            var myIssuer = "EasyEnglish";
            var myAudience = "EasyEnglish";

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = myIssuer,
                    ValidAudience = myAudience,
                    IssuerSigningKey = mySecurityKey
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }

        [HttpGet]
        [Route("api/Users/GetAll")]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            return Ok(await _objectuser.GetAllUsers());
        }

        [HttpPost]
        [Route("api/Users/Create")]
        public async Task<ActionResult<User>> Create(User u)
        {
            return Ok(await _objectuser.AddUser(u));
        }

        [HttpGet]
        [Route("api/Users/Details/{id}")]
        public async Task<ActionResult<User>> Details(Guid id)
        {
            return Ok(await _objectuser.GetUserData(id));
        }

        [HttpPut]
        [Route("api/Users/Edit")]
        public async Task<ActionResult<User>> Edit(User u)
        {
            return Ok(await _objectuser.UpdateUserM(u));
        }

        [HttpDelete]
        [Route("api/Users/Delete/{id}")]
        public async Task<ActionResult<User>> Delete(Guid id)
        {
            return Ok(await _objectuser.DeleteUser(id));
        }
    }
}
