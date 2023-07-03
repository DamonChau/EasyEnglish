using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Microsoft.AspNetCore.Authorization;

namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class FeedbackController : Controller
    {
        private readonly IFeedbackService _feebackService;

        public FeedbackController(IFeedbackService feebackService, EasyEnglishContext context)
        {
            _feebackService = feebackService;
        }

        [Authorize]
        [HttpGet]
        [Route("api/Feedback/GetFeedbackByExamResult/{examResultId}")]
        public async Task<ActionResult<Feedback>> GetFeedbackByExamResult(Guid examResultId)
        {
            try
            {
                return Ok(await _feebackService.GetFeedbacksByExamResult(examResultId));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpPost]
        [Route("api/Feedback/Create")]
        public async Task<ActionResult<Feedback>> Create([FromBody] Feedback u)
        {
            try
            {
                return Ok(await _feebackService.AddFeedback(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpGet]
        [Route("api/Feedback/Details/{id}")]
        public async Task<ActionResult<Feedback>> Details(Guid id)
        {
            try
            {
                return Ok(await _feebackService.GetFeedback(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut]
        [Route("api/Feedback/Edit")]
        public async Task<ActionResult<Feedback>> Edit([FromBody] Feedback u)
        {
            try
            {
                return Ok(await _feebackService.UpdateFeedback(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpDelete]
        [Route("api/Feedback/Delete/{id}")]
        public async Task<ActionResult<Feedback>> Delete(Guid id)
        {
            try
            {
                return Ok(await _feebackService.DeleteFeedback(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }
    }
}
