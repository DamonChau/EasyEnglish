using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Microsoft.AspNetCore.Authorization;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class UserAnswersController : Controller
    {
        private readonly IUserAnswersService _userAnswerService;

        public UserAnswersController(IUserAnswersService userAnswerService, EasyEnglishContext context)
        {
            _userAnswerService = userAnswerService;
        }

        [Authorize]
        [HttpGet]
        [Route("api/UserAnswers/GetAll")]
        public async Task<ActionResult<IEnumerable<UserAnswer>>> GetAll()
        {
            try
            {
                return Ok(await _userAnswerService.GetAllUserAnswer());
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [Authorize]
        [HttpGet]
        [Route("api/UserAnswers/GetAllByExam/{examResultId}")]
        public async Task<ActionResult<IEnumerable<UserAnswer>>> GetAllByExam(Guid examResultId)
        {
            try
            {
                return Ok(await _userAnswerService.GetAllByExam(examResultId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPost]
        [Route("api/UserAnswers/Create")]
        public async Task<ActionResult<UserAnswer>> Create([FromBody] UserAnswer u)
        {
            try
            {
                return Ok(await _userAnswerService.AddUserAnswer(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpGet]
        [Route("api/UserAnswers/Details/{id}")]
        public async Task<ActionResult<UserAnswer>> Details(Guid id)
        {
            try
            {
                return Ok(await _userAnswerService.GetUserAnswer(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [Authorize]
        [HttpPut]
        [Route("api/UserAnswers/Edit")]
        public async Task<ActionResult<UserAnswer>> Edit([FromBody] UserAnswer u)
        {
            try
            {
                return Ok(await _userAnswerService.UpdateUserAnswer(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpDelete]
        [Route("api/UserAnswers/Delete/{id}")]
        public async Task<ActionResult<UserAnswer>> Delete(Guid id)
        {
            try
            {
                return Ok(await _userAnswerService.DeleteUserAnswer(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }
    }
}
