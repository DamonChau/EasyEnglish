using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly EasyEnglishContext _context;

        public FeedbackService(EasyEnglishContext context)
        {
            _context = context;
        }

        public async Task<Feedback?> GetFeedbacksByExamResult(Guid examResultId)
        {
            try
            {
                return await _context.Feedbacks
                   .Where(fb => fb.ExamResultId == examResultId)
                    .FirstOrDefaultAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Feedback> AddFeedback(Feedback u)
        {
            try
            {
                u.Id = Guid.NewGuid();
                u.CreatedDate = DateTime.Now;
                _context.Feedbacks.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Feedback> UpdateFeedback(Feedback u)
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

        public async Task<Feedback?> GetFeedback(Guid id)
        {
            try
            {
                return await _context.Feedbacks.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<Feedback?> DeleteFeedback(Guid id)
        {
            try
            {
                Feedback? u = await _context.Feedbacks.FindAsync(id);
                if (u != null)
                {
                    _context.Feedbacks.Remove(u);
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
