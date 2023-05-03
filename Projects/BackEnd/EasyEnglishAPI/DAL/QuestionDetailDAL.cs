using EasyEnglishAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.DAL
{
    public class QuestionDetailDAL
    {
        private readonly EasyEnglishContext _context;

        public QuestionDetailDAL(EasyEnglishContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<QuestionDetail>> GetAllByQuestions(Guid questionId)
        {
            try
            {
                return await _context.QuestionDetails.Where(q => q.QuestionId == questionId).OrderBy(q => q.Order).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<QuestionDetail>> GetAllQuestionDetails()
        {
            try
            {
                return await _context.QuestionDetails.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<QuestionDetail> AddQuestionDetail(QuestionDetail u)
        {
            try
            {
                u.Id = Guid.NewGuid();
                u.CreatedDate = DateTime.Now;
                _context.QuestionDetails.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<QuestionDetail> UpdateQuestionDetail(QuestionDetail u)
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

        public async Task<QuestionDetail?> GetQuestionDetail(Guid id)
        {
            try
            {
                return await _context.QuestionDetails.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<QuestionDetail?> Delete(Guid id)
        {
            try
            {
                QuestionDetail? u = await _context.QuestionDetails.FindAsync(id);
                if (u != null)
                {
                    _context.QuestionDetails.Remove(u);
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
