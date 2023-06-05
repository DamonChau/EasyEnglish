using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.DAL;
using Microsoft.AspNetCore.Authorization;


namespace EasyEnglishAPI.Controllers
{
    [ApiController]
    public class AssignmentExamController : Controller
    {
        private readonly AssignmentExamDAL _objectDAL;

        public AssignmentExamController(EasyEnglishContext context)
        {
            _objectDAL = new AssignmentExamDAL(context);
        }

        [Authorize]
        [HttpGet]
        [Route("api/AssignmentExams/GetByUsers/{userId}/{examId}")]
        public async Task<ActionResult<AssignmentExam>> GetByUsersStatus(Guid userId, Guid examId)
        {
            try
            {
                AssignmentExam? r = await _objectDAL.GetByUsers(userId, examId);
                if (r == null)
                {
                    AssignmentExam exam = new AssignmentExam();
                    exam.UserId = userId;
                    exam.ExamTestId = examId;
                    exam.IsAssigned = false;
                    exam.IsBookmarked = false;
                    exam.IsDone = false;
                    exam.IsFavourite = false;
                    r = await _objectDAL.AddAssignmentExam(exam);
                }
                return Ok(r);
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }


        [Authorize]
        [HttpGet]
        [Route("api/AssignmentExams/GetAllByStatusWithDetail/{userId}/{status}")]
        public async Task<ActionResult<IEnumerable<AssignmentExam>>> GetAllByStatusWithDetail(Guid userId, int status)
        {
            try
            {
                if (status == 0)
                {
                    return Ok(await _objectDAL.GetAllByStatusWithDetailIsFav(userId));
                }
                else if (status == 1)
                {
                    return Ok(await _objectDAL.GetAllByStatusWithDetailIsBookmarked(userId));
                }
                else if (status == 2)
                {
                    return Ok(await _objectDAL.GetAllByStatusWithDetailIsAssigned(userId));
                }
                else if (status == 3)
                {
                    return Ok(await _objectDAL.GetAllByStatusWithDetailIsDone(userId));
                }
                else { return BadRequest(new { error = "Can not fulfill your request" }); }

            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }


        [Authorize]
        [HttpPut]
        [Route("api/AssignmentExams/UpdateStatusByUser")]
        public async Task<ActionResult<AssignmentExam>> UpdateStatusByUser([FromBody] AssignmentExam u)
        {
            try
            {
                AssignmentExam? r = await _objectDAL.GetByUsers(u.UserId, u.ExamTestId);
                if (r != null)
                {
                    r.IsAssigned = u.IsAssigned.HasValue ? u.IsAssigned : false;
                    r.IsBookmarked = u.IsBookmarked.HasValue ? u.IsBookmarked : false;
                    r.IsDone = u.IsDone.HasValue ? u.IsDone : false;
                    r.IsFavourite = u.IsFavourite.HasValue ? u.IsFavourite : false;
                    r = await _objectDAL.UpdateAssignmentExam(r);
                }
                return Ok(r);
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }


        [Authorize]
        [HttpPost]
        [Route("api/AssignmentExams/Create")]
        public async Task<ActionResult<AssignmentExam>> Create([FromBody] AssignmentExam u)
        {
            try
            {
                return Ok(await _objectDAL.AddAssignmentExam(u));

            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpGet]
        [Route("api/AssignmentExams/Details/{id}")]
        public async Task<ActionResult<AssignmentExam>> Details(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.GetAssignmentExam(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut]
        [Route("api/AssignmentExams/Edit")]
        public async Task<ActionResult<AssignmentExam>> Edit([FromBody] AssignmentExam u)
        {
            try
            {
                return Ok(await _objectDAL.UpdateAssignmentExam(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpDelete]
        [Route("api/AssignmentExams/Delete/{id}")]
        public async Task<ActionResult<AssignmentExam>> Delete(Guid id)
        {
            try
            {
                return Ok(await _objectDAL.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }
    }
}
