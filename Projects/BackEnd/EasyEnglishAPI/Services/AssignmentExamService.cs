using EasyEnglishAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.Services
{
    public class AssignmentExamService : IAssignmentExamService
    {
        private readonly EasyEnglishContext _context;

        public AssignmentExamService(EasyEnglishContext context)
        {
            _context = context;
        }

        public async Task<AssignmentExam?> GetByUsers(Guid? userid, Guid? examId)
        {
            try
            {
                return await _context.AssignmentExams
                    .Where(q => q.UserId == userid && q.ExamTestId == examId)
                    .FirstOrDefaultAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<AssignmentExam>> GetAllByStatusWithDetailIsFav(Guid? userid)
        {
            try
            {
                return await _context.AssignmentExams
                    .Where(q => q.UserId == userid && q.IsFavourite == true)
                    .Include(q => q.ExamTest)
                    .OrderByDescending(q => q.CreatedDate)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<AssignmentExam>> GetAllByStatusWithDetailIsBookmarked(Guid? userid)
        {
            try
            {
                return await _context.AssignmentExams
                    .Where(q => q.UserId == userid && q.IsBookmarked == true)
                    .Include(q => q.ExamTest)
                    .OrderByDescending(q => q.CreatedDate)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<AssignmentExam>> GetAllByStatusWithDetailIsAssigned(Guid? userid)
        {
            try
            {
                return await _context.AssignmentExams
                    .Where(q => q.UserId == userid && q.IsAssigned == true)
                    .Include(q => q.ExamTest)
                    .OrderByDescending(q => q.CreatedDate)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<AssignmentExam>> GetAllByStatusWithDetailIsDone(Guid? userid)
        {
            try
            {
                return await _context.AssignmentExams
                    .Where(q => q.UserId == userid && q.IsDone == true)
                    .Include(q => q.ExamTest)
                    .OrderByDescending(q => q.CreatedDate)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<AssignmentExam> AddAssignmentExam(AssignmentExam u)
        {
            try
            {
                u.Id = Guid.NewGuid();
                u.CreatedDate = DateTime.Now;
                _context.AssignmentExams.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<AssignmentExam> UpdateAssignmentExam(AssignmentExam u)
        {
            try
            {
                _context.Entry(u).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<AssignmentExam?> GetAssignmentExam(Guid id)
        {
            try
            {
                return await _context.AssignmentExams.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<AssignmentExam?> Delete(Guid id)
        {
            try
            {
                AssignmentExam? u = await _context.AssignmentExams.FindAsync(id);
                if (u != null)
                {
                    _context.AssignmentExams.Remove(u);
                    await _context.SaveChangesAsync();
                }
                return null;
            }
            catch
            {
                throw;
            }
        }
    }
}
