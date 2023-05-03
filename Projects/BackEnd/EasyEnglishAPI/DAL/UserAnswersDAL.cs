using EasyEnglishAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.DAL
{
    public class UserAnswersDAL
    {
        private readonly EasyEnglishContext _context;

        public UserAnswersDAL(EasyEnglishContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<UserAnswer>> GetAllUserAnswer()
        {
            try
            {
                return await _context.UserAnswers.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserAnswer> AddUserAnswer(UserAnswer u)
        {
            try
            {
                u.Id = Guid.NewGuid();
                u.CreatedDate = DateTime.Now;
                _context.UserAnswers.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserAnswer> UpdateUserAnswer(UserAnswer u)
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

        public async Task<UserAnswer?> GetUserAnswer(Guid id)
        {
            try
            {
                return await _context.UserAnswers.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserAnswer?> DeleteUserAnswer(Guid id)
        {
            try
            {
                UserAnswer? u = await _context.UserAnswers.FindAsync(id);
                if (u != null)
                {
                    _context.UserAnswers.Remove(u);
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
