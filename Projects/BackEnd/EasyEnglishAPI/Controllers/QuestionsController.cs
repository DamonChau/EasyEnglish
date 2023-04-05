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
            return Ok(await _objectDAL.GetAllQuestions());
        }

        [HttpPost]
        [Route("api/Questions/Create")]
        public async Task<ActionResult<Question>> Create(Question u)
        {
            return Ok(await _objectDAL.AddQuestion(u));
        }

        [HttpGet]
        [Route("api/Questions/Details/{id}")]
        public async Task<ActionResult<Question>> Details(Guid id)
        {
            return Ok(await _objectDAL.GetQuestion(id));
        }

        [HttpPut]
        [Route("api/Questions/Edit")]
        public async Task<ActionResult<Question>> Edit(Question u)
        {
            return Ok(await _objectDAL.UpdateQuestion(u));
        }

        [HttpDelete]
        [Route("api/Questions/Delete/{id}")]
        public async Task<ActionResult<Question>> Delete(Guid id)
        {
            return Ok(await _objectDAL.Delete(id));
        }
    }
}
