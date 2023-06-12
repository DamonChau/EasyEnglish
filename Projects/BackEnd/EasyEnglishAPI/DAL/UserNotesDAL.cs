using EasyEnglishAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.DAL
{
    public class UserNotesDAL
    {
        private readonly EasyEnglishContext _context;

        public UserNotesDAL(EasyEnglishContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserNote>> GetAllUserNotesByUser(Guid userId)
        {
            try
            {
                return await _context.UserNotes.Where(u => u.CreatedBy == userId).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<UserNote>> GetAllUserNotesByExamResult(Guid examResultId)
        {
            try
            {
                return await _context.UserNotes
                    .Where(u => u.ExamResultId == examResultId)
                    .Include(u => u.CreatedByNavigation)
                    .OrderByDescending(u => u.CreatedDate)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        
        public async Task<UserNote> AddUserNote(UserNote u)
        {
            try
            {
                u.Id = Guid.NewGuid();
                u.CreatedDate = DateTime.Now;
                _context.UserNotes.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserNote> UpdateUserNote(UserNote u)
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

        public async Task<UserNote?> GetUserNote(Guid id)
        {
            try
            {
                return await _context.UserNotes.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserNote?> DeleteUserNote(Guid id)
        {
            try
            {
                UserNote? u = await _context.UserNotes.FindAsync(id);
                if (u != null)
                {
                    _context.UserNotes.Remove(u);
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
