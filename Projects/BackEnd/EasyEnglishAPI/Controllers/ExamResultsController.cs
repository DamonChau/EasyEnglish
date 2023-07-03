using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Microsoft.AspNetCore.Authorization;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class ExamResultsController : Controller
    {
        private readonly IExamResultService _examResultService;

        public ExamResultsController(IExamResultService examResultService, EasyEnglishContext context)
        {
            _examResultService = examResultService;
        }

        [Authorize]
        [HttpGet]
        [Route("api/ExamResults/GetAllResultsByExamTest/{examTestId}")]
        public async Task<ActionResult<IEnumerable<ExamResult>>> GetAllResultsByExamTest(Guid examTestId)
        {
            try
            {
                return Ok(await _examResultService.GetAllResultsByExamTest(examTestId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpGet]
        [Route("api/ExamResults/GetAllResultsByExamTestDetail/{examTestId}")]
        public async Task<ActionResult<IEnumerable<ExamResult>>> GetAllResultsByExamTestDetail(Guid examTestId)
        {
            try
            {
                return Ok(await _examResultService.GetAllResultsByExamTestDetail(examTestId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpGet]
        [Route("api/ExamResults/GetAllResultByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<ExamResult>>> GetAllResultByUser(Guid userId)
        {
            try
            {
                return Ok(await _examResultService.GetAllResultByUser(userId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           ;
        }

        [Authorize]
        [HttpGet]
        [Route("api/ExamResults/GetTop3ResultsByUser/{userId}/{examTestId}")]
        public async Task<ActionResult<IEnumerable<ExamResult>>> GetTop3ResultsByUser(Guid userId, Guid examTestId)
        {
            try
            {
                return Ok(await _examResultService.GetTop3ResultsByUser(userId, examTestId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           ;
        }

        [Authorize]
        [HttpPost]
        [Route("api/ExamResults/Create")]
        public async Task<ActionResult<ExamResult>> Create([FromBody] ExamResult u)
        {
            try
            {
                return Ok(await _examResultService.AddExamResult(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
         
        }

        [Authorize]
        [HttpGet]
        [Route("api/ExamResults/Details/{id}")]
        public async Task<ActionResult<ExamResult>> Details(Guid id)
        {
            try
            {
                return Ok(await _examResultService.GetExamResult(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpPut]
        [Route("api/ExamResults/Edit")]
        public async Task<ActionResult<ExamResult>> Edit([FromBody] ExamResult u)
        {
            try
            {
                return Ok(await _examResultService.UpdateExamResult(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpDelete]
        [Route("api/ExamResults/Delete/{id}")]
        public async Task<ActionResult<ExamResult>> Delete(Guid id)
        {
            try
            {
                return Ok(await _examResultService.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }
    }
}
