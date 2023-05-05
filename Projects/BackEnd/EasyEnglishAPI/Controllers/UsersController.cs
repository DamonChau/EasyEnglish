using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using EasyEnglishAPI.Common;
using Microsoft.AspNetCore.Authorization;

namespace EasyEnglishAPI.Controllers
{
    public class UsersController : Controller
    {

        private readonly UserDAL _objectuser;
        private readonly JwtService _jwtService;

        public UsersController(EasyEnglishContext context, JwtService jwtService)
        {
            _objectuser = new UserDAL(context);
            _jwtService = jwtService;
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
                        return Ok(new { token = _jwtService.CreateToken(r), user = new { id = r.Id, 
                            userName = r.UserName, 
                            email = r.Email, 
                            userType = r.UserType, 
                            status = r.Status, 
                            createdDate = r.CreatedDate } });

                    return BadRequest(new { error = "The username or password provided were incorrect!" });
                }
                return BadRequest(new { error = u.ToString() });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }

        }

        [Authorize]
        [HttpGet]
        [Route("api/Users/GetAll")]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            try
            {
                return Ok(await _objectuser.GetAllUsers());
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [HttpPost]
        [Route("api/Users/Create")]
        public async Task<ActionResult<User>> Create(User u)
        {
            try
            {
                return Ok(await _objectuser.AddUser(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpGet]
        [Route("api/Users/Details/{id}")]
        public async Task<ActionResult<User>> Details(Guid id)
        {
            try
            {
                return Ok(await _objectuser.GetUserData(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut]
        [Route("api/Users/Edit")]
        public async Task<ActionResult<User>> Edit(User u)
        {
            try
            {
                return Ok(await _objectuser.UpdateUserM(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpDelete]
        [Route("api/Users/Delete/{id}")]
        public async Task<ActionResult<User>> Delete(Guid id)
        {
            try
            {
                return Ok(await _objectuser.DeleteUser(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }
    }
}
