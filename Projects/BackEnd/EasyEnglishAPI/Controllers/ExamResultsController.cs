using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;

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

        [HttpGet]
        [Route("api/ExamResults/GetAllResultsByExamTest/{examTestId}")]
        public async Task<ActionResult<IEnumerable<ExamResult>>> GetAllResultsByExamTest(Guid examTestId)
        {
            return Ok(await _objectDAL.GetAllResultsByExamTest(examTestId));
        }

        [HttpGet]
        [Route("api/ExamResults/GetAllResultsByExamTestDetail/{examTestId}")]
        public async Task<ActionResult<IEnumerable<ExamResult>>> GetAllResultsByExamTestDetail(Guid examTestId)
        {
            return Ok(await _objectDAL.GetAllResultsByExamTestDetail(examTestId));
        }

        [HttpGet]
        [Route("api/ExamResults/GetAllResultByUser/{userId}")]
        public async Task<ActionResult<IEnumerable<ExamResult>>> GetAllResultByUser(Guid userId)
        {
            return Ok(await _objectDAL.GetAllResultByUser(userId));
        }

        [HttpPost]
        [Route("api/ExamResults/Create")]
        public async Task<ActionResult<ExamResult>> Create([FromBody] ExamResult u)
        {
            return Ok(await _objectDAL.AddExamResult(u));
        }

        [HttpGet]
        [Route("api/ExamResults/Details/{id}")]
        public async Task<ActionResult<ExamResult>> Details(Guid id)
        {
            return Ok(await _objectDAL.GetExamResult(id));
        }

        [HttpPut]
        [Route("api/ExamResults/Edit")]
        public async Task<ActionResult<ExamResult>> Edit([FromBody] ExamResult u)
        {
            return Ok(await _objectDAL.UpdateExamResult(u));
        }

        [HttpDelete]
        [Route("api/ExamResults/Delete/{id}")]
        public async Task<ActionResult<ExamResult>> Delete(Guid id)
        {
            return Ok(await _objectDAL.Delete(id));
        }
    }
}
