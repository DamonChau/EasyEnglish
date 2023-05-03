using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class UserNotesController : Controller
    {
        private readonly UserNotesDAL _objectDAL;

        public UserNotesController(EasyEnglishContext context)
        {
            _objectDAL = new UserNotesDAL(context);
        }

        [HttpGet]
        [Route("api/UserNotes/GetAllUserNotesByExamResult/{examId}")]
        public async Task<ActionResult<IEnumerable<UserNote>>> GetAllUserNotesByExamResult(Guid examId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllUserNotesByExamResult(examId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [HttpGet]
        [Route("api/UserNotes/GetAllUserNotesByUserAnswerId/{answerId}")]
        public async Task<ActionResult<IEnumerable<UserNote>>> GetAllUserNotesByUserAnswerId(Guid answerId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllUserNotesByUserAnswerId(answerId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [HttpGet]
        [Route("api/UserNotes/GetAllUserNotesByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<UserNote>>> GetAllUserNotesByUser(Guid userId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllUserNotesByUser(userId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [HttpPost]
        [Route("api/UserNotes/Create")]
        public async Task<ActionResult<UserNote>> Create([FromBody] UserNote u)
        {
            try
            {
                return Ok(await _objectDAL.AddUserNote(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [HttpGet]
        [Route("api/UserNotes/Details/{id}")]
        public async Task<ActionResult<UserNote>> Details(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.GetUserNote(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpPut]
        [Route("api/UserNotes/Edit")]
        public async Task<ActionResult<UserNote>> Edit([FromBody] UserNote u)
        {
            try
            {
                return Ok(await _objectDAL.UpdateUserNote(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpDelete]
        [Route("api/UserNotes/Delete/{id}")]
        public async Task<ActionResult<UserNote>> Delete(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.DeleteUserNote(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }
    }
}
