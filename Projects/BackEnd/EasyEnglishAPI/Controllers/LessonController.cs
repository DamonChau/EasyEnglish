
using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Microsoft.AspNetCore.Authorization;


namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class LessonController : Controller
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService, EasyEnglishContext context)
        {
            _lessonService = lessonService;
        }

        [Authorize]
        [HttpGet]
        [Route("api/Lesson/GetAllLessons")]
        public async Task<ActionResult<IEnumerable<Lesson>>> GetAllLessons()
        {
            try
            {
                return Ok(await _lessonService.GetAllLessons());
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [HttpGet]
        [Route("api/Lesson/GetAllLessonByType/{lessonType}")]
        public async Task<ActionResult<IEnumerable<Lesson>>> GetAllLessonByType(int lessonType)
        {
            try
            {
                return Ok(await _lessonService.GetAllLessonByType(lessonType));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPost]
        [Route("api/Lesson/Create")]
        public async Task<ActionResult<Lesson>> Create([FromBody] Lesson u)
        {
            try
            {
                return Ok(await _lessonService.AddLesson(u));
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }

        }

        [HttpGet]
        [Route("api/Lesson/Details/{id}")]
        public async Task<ActionResult<Lesson>> Details(Guid id)
        {
            try
            {
                return Ok(await _lessonService.GetLesson(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut]
        [Route("api/Lesson/Edit")]
        public async Task<ActionResult<Lesson>> Edit([FromBody] Lesson u)
        {
            try
            {
                return Ok(await _lessonService.UpdateLesson(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpDelete]
        [Route("api/Lesson/Delete/{id}")]
        public async Task<ActionResult<Lesson>> Delete(Guid id)
        {
            try
            {
                return Ok(await _lessonService.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }
    }
}
