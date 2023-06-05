using EasyEnglishAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.DAL
{
    public class ExamResultDAL
    {
        private readonly EasyEnglishContext _context;

        public ExamResultDAL(EasyEnglishContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<ExamResult>> GetAllResultsByExamTest(Guid examTestId)
        {
            try
            {
                return await _context.ExamResults
                    .Where(q => q.ExamTestId == examTestId)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<ExamResult>> GetAllResultsByExamTestDetail(Guid examTestId)
        {
            try
            {
                return await _context.ExamResults
                    .Include(q => q.ExamTest)
                    .Where(q => q.ExamTestId == examTestId)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<ExamResult>> GetAllResultByUser(Guid userId)
        {
            try
            {
                return await _context.ExamResults
                    .Where(q => q.CreatedBy == userId)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<ExamResult>> GetTop3ResultsByUser(Guid userId, Guid examTestId)
        {
            try
            {
                return await _context.ExamResults
                    .Where(q => q.ExamTestId == examTestId && q.CreatedBy == userId)
                    .OrderByDescending(q => q.CreatedDate)
                    .Take(3)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<ExamResult> AddExamResult(ExamResult u)
        {
            try
            {
                u.Id = Guid.NewGuid();
                u.CreatedDate = DateTime.Now;
                _context.ExamResults.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<ExamResult> UpdateExamResult(ExamResult u)
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

        public async Task<ExamResult?> GetExamResult(Guid id)
        {
            try
            {
                return await _context.ExamResults.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<ExamResult?> Delete(Guid id)
        {
            try
            {
                ExamResult? u = await _context.ExamResults.FindAsync(id);
                if (u != null)
                {
                    _context.ExamResults.Remove(u);
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
