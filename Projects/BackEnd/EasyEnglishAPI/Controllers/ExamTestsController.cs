using System;
using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;
using Microsoft.AspNetCore.Authorization;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class ExamTestsController : Controller
    {
        private readonly ExamTestsDAL _object;

        public ExamTestsController(EasyEnglishContext context)
        {
            _object = new ExamTestsDAL(context);
        }

        [Authorize]
        [HttpGet]
        [Route("api/ExamTests/GetAll")]
        public async Task<ActionResult<IEnumerable<ExamTest>>> GetAll()
        {
            try
            {
                return Ok(await _object.GetAllExamTests());
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [HttpGet]
        [Route("api/ExamTests/GetAllExamTestsBySection/{testType}/{sectionType}")]
        public async Task<ActionResult<IEnumerable<ExamTest>>> GetAllExamTestsBySection(int testType, int sectionType)
        {
            try
            {
                return Ok(await _object.GetAllExamTestsBySection(testType, sectionType));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPost]
        [Route("api/ExamTests/Create")]
        public async Task<ActionResult<ExamTest>> Create([FromBody] ExamTest u)
        {
            try
            {
                return Ok(await _object.AddExamTests(u));
            }
            catch (Exception e)
            {

                return BadRequest(new { error = e.Message });
            }

        }

        [HttpGet]
        [Route("api/ExamTests/Details/{id}")]
        public async Task<ActionResult<ExamTest>> Details(Guid id)
        {
            try
            {
                return Ok(await _object.GetExamTests(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut]
        [Route("api/ExamTests/Edit")]
        public async Task<ActionResult<ExamTest>> Edit([FromBody] ExamTest u)
        {
            try
            {
                return Ok(await _object.UpdateExamTests(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [Authorize]
        [HttpDelete]
        [Route("api/ExamTests/Delete/{id}")]
        public async Task<ActionResult<ExamTest>> Delete(Guid id)
        {
            try
            {
                return Ok(await _object.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }
    }
}
