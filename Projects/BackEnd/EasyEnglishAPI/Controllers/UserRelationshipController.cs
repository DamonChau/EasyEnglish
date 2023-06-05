using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;
using Microsoft.AspNetCore.Authorization;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class UserRelationshipController : Controller
    {
        private readonly UserRelationshipDAL _objectDAL;
        public UserRelationshipController(EasyEnglishContext context)
        {
            _objectDAL = new UserRelationshipDAL(context);
        }

        [Authorize]
        [HttpGet]
        [Route("api/UserRelationship/GetAllByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<UserRelationship>>> GetAllByUser(Guid userId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllByUser(userId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpGet]
        [Route("api/UserRelationship/GetAllTeachersByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<UserRelationship>>> GetAllTeachersByUser(Guid userId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllTeachersByUser(userId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpGet]
        [Route("api/UserRelationship/GetAllStudentsByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<UserRelationship>>> GetAllStudentsByUser(Guid userId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllStudentsByUser(userId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPost]
        [Route("api/UserRelationship/Create")]
        public async Task<ActionResult<UserRelationship>> Create([FromBody] UserRelationship u)
        {
            try
            {
                return Ok(await _objectDAL.AddUserRelationship(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpGet]
        [Route("api/UserRelationship/Details/{id}")]
        public async Task<ActionResult<UserRelationship>> Details(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.GetUserRelationship(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut]
        [Route("api/UserRelationship/UpdateStatus")]
        public async Task<ActionResult<UserRelationship>> UpdateStatus([FromBody] UserRelationship u)
        {
            try
            {
                return Ok(await _objectDAL.UpdateStatus(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut]
        [Route("api/UserRelationship/Edit")]
        public async Task<ActionResult<UserRelationship>> Edit([FromBody] UserRelationship u)
        {
            try
            {
                return Ok(await _objectDAL.UpdateUserRelationship(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpDelete]
        [Route("api/UserRelationship/Delete/{id}")]
        public async Task<ActionResult<UserRelationship>> Delete(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.DeleteUserRelationship(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }
    }
}
