using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;
using System.Xml.Linq;


namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class CommentsController : Controller
    {
        private readonly CommentDAL _objectDAL;

        public CommentsController(EasyEnglishContext context)
        {
            _objectDAL = new CommentDAL(context);
        }

        [HttpGet]
        [Route("api/Comments/GetAllCommentsByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetAllCommentsByUser(Guid userId)
        {
            return Ok(await _objectDAL.GetAllCommentsByUser(userId));
        }

        [HttpGet]
        [Route("api/Comments/GetAllCommentsByExam/{examId}")]
        public async Task<ActionResult<IEnumerable<UserNote>>> GetAllCommentsByExam(Guid examId)
        {
            return Ok(await _objectDAL.GetAllCommentsByExam(examId));
        }

        [HttpPost]
        [Route("api/Comments/Create")]
        public async Task<ActionResult<Comment>> Create([FromBody] Comment u)
        {
            return Ok(await _objectDAL.AddComment(u));
        }

        [HttpGet]
        [Route("api/Comments/Details/{id}")]
        public async Task<ActionResult<Comment>> Details(Guid id)
        {
            return Ok(await _objectDAL.GetComment(id));
        }

        [HttpPut]
        [Route("api/Comments/Edit")]
        public async Task<ActionResult<Comment>> Edit([FromBody] Comment u)
        {
            return Ok(await _objectDAL.UpdateComment(u));
        }

        [HttpDelete]
        [Route("api/Comments/Delete/{id}")]
        public async Task<ActionResult<Comment>> Delete(Guid id)
        {
            return Ok(await _objectDAL.DeleteComment(id));
        }
    }
}
