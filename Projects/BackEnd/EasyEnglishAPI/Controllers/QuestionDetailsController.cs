using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;

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

       
        [HttpGet]
        [Route("api/QuestionDetails/GetAllByQuestions/{questionId}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetAllByQuestions(Guid questionId)
        {
            return Ok(await _objectDAL.GetAllByQuestions(questionId));
        }

        [HttpPost]
        [Route("api/QuestionDetails/Create")]
        public async Task<ActionResult<QuestionDetail>> Create([FromBody]QuestionDetail u)
        {
            return Ok(await _objectDAL.AddQuestionDetail(u));
        }

        [HttpGet]
        [Route("api/QuestionDetails/Details/{id}")]
        public async Task<ActionResult<QuestionDetail>> Details(Guid id)
        {
            return Ok(await _objectDAL.GetQuestionDetail(id));
        }

        [HttpPut]
        [Route("api/QuestionDetails/Edit")]
        public async Task<ActionResult<QuestionDetail>> Edit([FromBody]QuestionDetail u)
        {
            return Ok(await _objectDAL.UpdateQuestionDetail(u));
        }

        [HttpDelete]
        [Route("api/QuestionDetails/Delete/{id}")]
        public async Task<ActionResult<QuestionDetail>> Delete(Guid id)
        {
            return Ok(await _objectDAL.Delete(id));
        }
    }
}
