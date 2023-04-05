using System;
using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;

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

        [HttpGet]
        [Route("api/ExamTests/GetAll")]
        public async Task<ActionResult<IEnumerable<ExamTest>>> GetAll()
        {
            return  Ok(await _object.GetAllExamTests());
        }

        [HttpPost]
        [Route("api/ExamTests/Create")]
        public async Task<ActionResult<ExamTest>> Create([FromBody]ExamTest u)
        {
            return Ok(await _object.AddExamTests(u));
        }

        [HttpGet]
        [Route("api/ExamTests/Details/{id}")]
        public async Task<ActionResult<ExamTest>> Details(Guid id)
        {
            return Ok(await _object.GetExamTests(id));
        }

        [HttpPut]
        [Route("api/ExamTests/Edit")]
        public async Task<ActionResult<ExamTest>> Edit([FromBody]ExamTest u)
        {
            return Ok(await _object.UpdateExamTests(u));
        }

        [HttpDelete]
        [Route("api/ExamTests/Delete/{id}")]
        public async Task<ActionResult<ExamTest>> Delete(Guid id)
        {
            return Ok(await _object.Delete(id));
        }
    }
}
