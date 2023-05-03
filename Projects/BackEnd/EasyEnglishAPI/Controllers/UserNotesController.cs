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
            return Ok(await _objectDAL.GetAllUserNotesByExamResult(examId));
        }

        [HttpGet]
        [Route("api/UserNotes/GetAllUserNotesByUserAnswerId/{answerId}")]
        public async Task<ActionResult<IEnumerable<UserNote>>> GetAllUserNotesByUserAnswerId(Guid answerId)
        {
            return Ok(await _objectDAL.GetAllUserNotesByUserAnswerId(answerId));
        }

        [HttpGet]
        [Route("api/UserNotes/GetAllUserNotesByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<UserNote>>> GetAllUserNotesByUser(Guid userId)
        {
            return Ok(await _objectDAL.GetAllUserNotesByUser(userId));
        }

        [HttpPost]
        [Route("api/UserNotes/Create")]
        public async Task<ActionResult<UserNote>> Create([FromBody] UserNote u)
        {
            return Ok(await _objectDAL.AddUserNote(u));
        }

        [HttpGet]
        [Route("api/UserNotes/Details/{id}")]
        public async Task<ActionResult<UserNote>> Details(Guid id)
        {
            return Ok(await _objectDAL.GetUserNote(id));
        }

        [HttpPut]
        [Route("api/UserNotes/Edit")]
        public async Task<ActionResult<UserNote>> Edit([FromBody] UserNote u)
        {
            return Ok(await _objectDAL.UpdateUserNote(u));
        }

        [HttpDelete]
        [Route("api/UserNotes/Delete/{id}")]
        public async Task<ActionResult<UserNote>> Delete(Guid id)
        {
            return Ok(await _objectDAL.DeleteUserNote(id));
        }
    }
}
