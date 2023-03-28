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
        public IEnumerable<ExamTest> GetAll()
        {
            return _object.GetAllExamTests();
        }

        [HttpPost]
        [Route("api/ExamTests/Create")]
        public int Create([FromBody]ExamTest u)
        {
            return _object.AddExamTests(u);
        }

        [HttpGet]
        [Route("api/ExamTests/Details/{id}")]
        public ExamTest Details(Guid id)
        {
            return _object.GetExamTests(id);
        }

        [HttpPut]
        [Route("api/ExamTests/Edit/{id}")]
        public int Edit([FromBody]ExamTest u)
        {
            return _object.UpdateExamTests(u);
        }

        [HttpDelete]
        [Route("api/ExamTests/Delete/{id}")]
        public int Delete(Guid id)
        {
            return _object.Delete(id);
        }
    }
}
