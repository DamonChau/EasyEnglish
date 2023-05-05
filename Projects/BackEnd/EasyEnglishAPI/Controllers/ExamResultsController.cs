using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;
using Microsoft.AspNetCore.Authorization;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class ExamResultsController : Controller
    {
        private readonly ExamResultDAL _objectDAL;

        public ExamResultsController(EasyEnglishContext context)
        {
            _objectDAL = new ExamResultDAL(context);
        }

        [Authorize]
        [HttpGet]
        [Route("api/ExamResults/GetAllResultsByExamTest/{examTestId}")]
        public async Task<ActionResult<IEnumerable<ExamResult>>> GetAllResultsByExamTest(Guid examTestId)
        {
            try
            {
                return Ok(await _objectDAL.GetAllResultsByExamTest(examTestId));
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
                return Ok(await _objectDAL.GetAllResultsByExamTestDetail(examTestId));
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
                return Ok(await _objectDAL.GetAllResultByUser(userId));
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
                return Ok(await _objectDAL.AddExamResult(u));
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
                return Ok(await _objectDAL.GetExamResult(id));
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
                return Ok(await _objectDAL.UpdateExamResult(u));
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
                return Ok(await _objectDAL.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }
    }
}
