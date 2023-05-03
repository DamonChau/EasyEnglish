﻿using Microsoft.AspNetCore.Mvc;
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
            try
            {
                return Ok(await _objectDAL.GetAllUserAnswer());
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [HttpPost]
        [Route("api/UserAnswers/Create")]
        public async Task<ActionResult<UserAnswer>> Create([FromBody] UserAnswer u)
        {
            try
            {
                return Ok(await _objectDAL.AddUserAnswer(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpGet]
        [Route("api/UserAnswers/Details/{id}")]
        public async Task<ActionResult<UserAnswer>> Details(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.GetUserAnswer(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
           
        }

        [HttpPut]
        [Route("api/UserAnswers/Edit")]
        public async Task<ActionResult<UserAnswer>> Edit([FromBody] UserAnswer u)
        {
            try
            {
                return Ok(await _objectDAL.UpdateUserAnswer(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        [HttpDelete]
        [Route("api/UserAnswers/Delete/{id}")]
        public async Task<ActionResult<UserAnswer>> Delete(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.DeleteUserAnswer(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }
    }
}
