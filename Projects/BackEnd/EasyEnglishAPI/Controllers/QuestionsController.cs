using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Microsoft.AspNetCore.Authorization;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class QuestionsController : Controller
    {
        private readonly IQuestionService _questionService;

        public QuestionsController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [Authorize]
        [HttpGet]
        [Route("api/Questions/GetAll")]
        public async Task<ActionResult<IEnumerable<Question>>> GetAll()
        {
            try
            {
                return Ok(await _questionService.GetAllQuestions());
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpGet]
        [Route("api/Questions/GetAllExamTest/{examTestId}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetAllExamTest(Guid examTestId)
        {
            try
            {
                return Ok(await _questionService.GetAllQuestionsByExamTest(examTestId));
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
                return Ok(await _questionService.GetAllQuestionsByExamTestWithQD(examTestId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [Authorize]
        [HttpPost]
        [Route("api/Questions/Create")]
        public async Task<ActionResult<Question>> Create([FromBody] Question u)
        {
            try
            {
                return Ok(await _questionService.AddQuestion(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpGet]
        [Route("api/Questions/Details/{id}")]
        public async Task<ActionResult<Question>> Details(Guid id)
        {
            try
            {
                return Ok(await _questionService.GetQuestion(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpPut]
        [Route("api/Questions/Edit")]
        public async Task<ActionResult<Question>> Edit([FromBody] Question u)
        {
            try
            {
                return Ok(await _questionService.UpdateQuestion(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpDelete]
        [Route("api/Questions/Delete/{id}")]
        public async Task<ActionResult<Question>> Delete(Guid id)
        {
            try
            {
                return Ok(await _questionService.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }
    }
}
