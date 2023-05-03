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
            try
            {
                return Ok(await _objectDAL.GetAllCommentsByUser(userId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [HttpGet]
        [Route("api/Comments/GetAllCommentsByExam/{examId}")]
        public async Task<ActionResult<IEnumerable<UserNote>>> GetAllCommentsByExam(Guid examId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllCommentsByExam(examId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [HttpPost]
        [Route("api/Comments/Create")]
        public async Task<ActionResult<Comment>> Create([FromBody] Comment u)
        {
            try
            {
                return Ok(await _objectDAL.AddComment(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [HttpGet]
        [Route("api/Comments/Details/{id}")]
        public async Task<ActionResult<Comment>> Details(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.GetComment(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpPut]
        [Route("api/Comments/Edit")]
        public async Task<ActionResult<Comment>> Edit([FromBody] Comment u)
        {
            try
            {
                return Ok(await _objectDAL.UpdateComment(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpDelete]
        [Route("api/Comments/Delete/{id}")]
        public async Task<ActionResult<Comment>> Delete(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.DeleteComment(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }
    }
}
