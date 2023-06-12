using EasyEnglishAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.DAL
{
    public class CommentDAL
    {
        private readonly EasyEnglishContext _context;

        public CommentDAL(EasyEnglishContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> GetAllCommentsByUser(Guid userId)
        {
            try
            {
                return await _context.Comments.Where(u => u.CreatedBy == userId && u.ParentId == null)
                    .Include(u => u.CreatedByNavigation)
                    .OrderByDescending(u => u.CreatedDate).ThenBy(u => u.CreatedBy)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Comment>> GetAllCommentsByExam(Guid examId)
        {
            try
            {
                List<Comment> allComments = await _context.Comments
                    .Include(u => u.InverseParent)
                    .Include(u => u.CreatedByNavigation)
                    .OrderByDescending(u => u.CreatedDate)
                    .ThenBy(u=>u.CreatedBy)
                    .ToListAsync();

                IEnumerable<Comment> filteredComments = allComments.Where(u => u.ExamTestId == examId && u.ParentId == null);
                return filteredComments;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Comment> AddComment(Comment u)
        {
            try
            {
                u.Id = Guid.NewGuid();
                u.CreatedDate = DateTime.Now;
                _context.Comments.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Comment> UpdateComment(Comment u)
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

        public async Task<Comment?> GetComment(Guid id)
        {
            try
            {
                return await _context.Comments.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<Comment?> DeleteComment(Guid id)
        {
            try
            {
                Comment? u = await _context.Comments.FindAsync(id);
                if (u != null)
                {
                    _context.Comments.Remove(u);
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
