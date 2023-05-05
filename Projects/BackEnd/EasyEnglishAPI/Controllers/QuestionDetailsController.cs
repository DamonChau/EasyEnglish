using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;
using Microsoft.AspNetCore.Authorization;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class QuestionDetailsController : Controller
    {
        private readonly QuestionDetailDAL _objectDAL;

        public QuestionDetailsController(EasyEnglishContext context)
        {
            _objectDAL = new QuestionDetailDAL(context);
        }

        [Authorize]
        [HttpGet]
        [Route("api/QuestionDetails/GetAllByQuestions/{questionId}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetAllByQuestions(Guid questionId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllByQuestions(questionId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpPost]
        [Route("api/QuestionDetails/Create")]
        public async Task<ActionResult<QuestionDetail>> Create([FromBody]QuestionDetail u)
        {
            try
            {
                return Ok(await _objectDAL.AddQuestionDetail(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpGet]
        [Route("api/QuestionDetails/Details/{id}")]
        public async Task<ActionResult<QuestionDetail>> Details(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.GetQuestionDetail(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpPut]
        [Route("api/QuestionDetails/Edit")]
        public async Task<ActionResult<QuestionDetail>> Edit([FromBody]QuestionDetail u)
        {
            try
            {
                return Ok(await _objectDAL.UpdateQuestionDetail(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpDelete]
        [Route("api/QuestionDetails/Delete/{id}")]
        public async Task<ActionResult<QuestionDetail>> Delete(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
          
        }
    }
}
