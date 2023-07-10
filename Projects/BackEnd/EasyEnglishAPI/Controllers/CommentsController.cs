using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Microsoft.AspNetCore.Authorization;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class CommentsController : Controller
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [Authorize]
        [HttpGet]
        [Route("api/Comments/GetAllCommentsByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetAllCommentsByUser(Guid userId)
        {
            try
            {
                return Ok(await _commentService.GetAllCommentsByUser(userId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [HttpGet]
        [Route("api/Comments/GetAllCommentsByExam/{examId}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetAllCommentsByExam(Guid examId)
        {
            try
            {
                return Ok(await _commentService.GetAllCommentsByExam(examId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpPost]
        [Route("api/Comments/Create")]
        public async Task<ActionResult<Comment>> Create([FromBody] Comment u)
        {
            try
            {
                return Ok(await _commentService.AddComment(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [Authorize]
        [HttpGet]
        [Route("api/Comments/Details/{id}")]
        public async Task<ActionResult<Comment>> Details(Guid id)
        {
            try
            {
                return Ok(await _commentService.GetComment(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpPut]
        [Route("api/Comments/Edit")]
        public async Task<ActionResult<Comment>> Edit([FromBody] Comment u)
        {
            try
            {
                return Ok(await _commentService.UpdateComment(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpDelete]
        [Route("api/Comments/Delete/{id}")]
        public async Task<ActionResult<Comment>> Delete(Guid id)
        {
            try
            {
                return Ok(await _commentService.DeleteComment(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }
    }
}
