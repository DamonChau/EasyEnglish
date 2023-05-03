using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class UserAnswersController : Controller
    {
        private readonly UserAnswersDAL _objectDAL;

        public UserAnswersController(EasyEnglishContext context)
        {
            _objectDAL = new UserAnswersDAL(context);
        }

        [HttpGet]
        [Route("api/UserAnswers/GetAll")]
        public async Task<ActionResult<IEnumerable<UserAnswer>>> GetAll()
        {
            return Ok(await _objectDAL.GetAllUserAnswer());
        }

        [HttpPost]
        [Route("api/UserAnswers/Create")]
        public async Task<ActionResult<UserAnswer>> Create([FromBody] UserAnswer u)
        {
            return Ok(await _objectDAL.AddUserAnswer(u));
        }

        [HttpGet]
        [Route("api/UserAnswers/Details/{id}")]
        public async Task<ActionResult<UserAnswer>> Details(Guid id)
        {
            return Ok(await _objectDAL.GetUserAnswer(id));
        }

        [HttpPut]
        [Route("api/UserAnswers/Edit")]
        public async Task<ActionResult<UserAnswer>> Edit([FromBody] UserAnswer u)
        {
            return Ok(await _objectDAL.UpdateUserAnswer(u));
        }

        [HttpDelete]
        [Route("api/UserAnswers/Delete/{id}")]
        public async Task<ActionResult<UserAnswer>> Delete(Guid id)
        {
            return Ok(await _objectDAL.DeleteUserAnswer(id));
        }
    }
}
