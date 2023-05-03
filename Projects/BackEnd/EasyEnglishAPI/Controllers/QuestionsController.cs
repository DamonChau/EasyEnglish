using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class QuestionsController : Controller
    {
        private readonly QuestionDAL _objectDAL;

        public QuestionsController(EasyEnglishContext context)
        {
            _objectDAL = new QuestionDAL(context);
        }

        [HttpGet]
        [Route("api/Questions/GetAll")]
        public async Task<ActionResult<IEnumerable<Question>>> GetAll()
        {
            try
            {
                return Ok(await _objectDAL.GetAllQuestions());
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpGet]
        [Route("api/Questions/GetAllExamTest/{examTestId}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetAllExamTest(Guid examTestId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllQuestionsByExamTest(examTestId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [HttpGet]
        [Route("api/Questions/GetAllExamTestWithQD/{examTestId}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetAllExamTestWithQD(Guid examTestId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllQuestionsByExamTestWithQD(examTestId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [HttpPost]
        [Route("api/Questions/Create")]
        public async Task<ActionResult<Question>> Create([FromBody] Question u)
        {
            try
            {
                return Ok(await _objectDAL.AddQuestion(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpGet]
        [Route("api/Questions/Details/{id}")]
        public async Task<ActionResult<Question>> Details(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.GetQuestion(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpPut]
        [Route("api/Questions/Edit")]
        public async Task<ActionResult<Question>> Edit([FromBody] Question u)
        {
            try
            {
                return Ok(await _objectDAL.UpdateQuestion(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpDelete]
        [Route("api/Questions/Delete/{id}")]
        public async Task<ActionResult<Question>> Delete(Guid id)
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
