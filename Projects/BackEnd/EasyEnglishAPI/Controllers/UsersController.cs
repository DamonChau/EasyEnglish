﻿using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using EasyEnglishAPI.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

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
                if (_objectuser is not null && u is not null)
                {
                    //loginType = Google or Facebook
                    if (u.LoginType != 0 && u.UserName is not null)
                    {
                        bool isUserExists = await _objectuser.IsUserNameExists(u.UserName);
                        if (!isUserExists)
                        {
                            u = await _objectuser.AddUser(u);
                        }
                    }

                    string refreshToken = _jwtService.GenerateRefreshToken();
                    u.RefreshToken = refreshToken;
                    User? r = await _objectuser.Login(u);

                    if (r != null)
                    {
                        //hide password from client side
                        r.Password = null;
                        return Ok(new
                        {
                            token = _jwtService.CreateToken(r),
                            refreshToken = refreshToken,
                            user = r,
                        });
                    }
                    return BadRequest(new { error = "The username or password provided were incorrect!" });
                }
                return BadRequest(new { error = "Can not parse user" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }

        }

        [HttpPost]
        [Route("api/Users/refreshToken")]
        public async Task<ActionResult<User>> RefreshToken([FromHeader] string refreshToken, [FromHeader] string authorization)
        {
            try
            {
                if (refreshToken is null)
                {
                    return BadRequest(new { error = "Invalid client request" });
                }

                var principal = _jwtService.GetPrincipalFromExpiredToken(authorization.Split(' ')[1]);
                if (principal == null)
                {
                    return BadRequest(new { error = "Invalid access token or refresh toke" });
                }

                var userId = principal.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
                var user = await _objectuser.GetUserData(new Guid(userId));

                if (user == null || user.RefreshToken != refreshToken)
                {
                    return BadRequest(new { error = "Invalid access token or refresh toke" });
                }

                var newAccessToken = _jwtService.CreateToken(user);
                var newRefreshToken = _jwtService.GenerateRefreshToken();
                //hide password from client side
                user.Password = null;
                return Ok(new
                {
                    token = newAccessToken,
                    refreshToken = refreshToken,
                    user = user
                }); ;
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [HttpGet]
        [Route("api/Users/IsUserNameExists/{username}")]
        public async Task<ActionResult<Boolean>> IsUserNameExists(string username)
        {
            try
            {
                return Ok(await _objectuser.IsUserNameExists(username));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
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

        [Authorize]
        [HttpGet]
        [Route("api/Users/GetAllTeachers/{userId}")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllTeachers(Guid userId)
        {
            try
            {
                return Ok(await _objectuser.GetAllTeachers(userId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPost]
        [Route("api/Users/Create")]
        public async Task<ActionResult<User>> Create([FromBody] User u)
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
        [Route("api/Users/UpdateUserProfile")]
        public async Task<ActionResult<User>> UpdateUserProfile([FromBody] User u)
        {
            try
            {
                return Ok(await _objectuser.UpdateUserProfile(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut]
        [Route("api/Users/UpdateUser")]
        public async Task<ActionResult<User>> UpdateUser([FromBody] User u)
        {
            try
            {
                return Ok(await _objectuser.UpdateUser(u));
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
