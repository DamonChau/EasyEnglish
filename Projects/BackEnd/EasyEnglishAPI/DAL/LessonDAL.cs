
using EasyEnglishAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.DAL
{
    public class LessonDAL
    {
        private readonly EasyEnglishContext _context;

        public LessonDAL(EasyEnglishContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Lesson>> GetAllLessons()
        {
            try
            {
                return await _context.Lessons.OrderBy(t => t.LessonType)
                                                .ThenByDescending(t => t.CreatedDate)
                                                .ThenBy(t => t.LessonName)
                                                .ThenBy(t => t.Title).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Lesson>> GetAllLessonByType(int lessonType)
        {
            try
            {
                return await _context.Lessons.Where(t => t.LessonType == lessonType)
                                                .OrderBy(t => t.LessonType)
                                                .ThenByDescending(t => t.CreatedDate)
                                                .ThenBy(t => t.Title).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Lesson> AddLesson(Lesson u)
        {
            try
            {

                u.Id = Guid.NewGuid();
                u.CreatedDate = DateTime.Now;
                await _context.Lessons.AddAsync(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Lesson> UpdateLesson(Lesson u)
        {
            try
            {
                u.CreatedDate = DateTime.Now;
                _context.Entry(u).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Lesson?> GetLesson(Guid id)
        {
            try
            {
                return await _context.Lessons.FindAsync(id);

            }
            catch
            {
                throw;

            }
        }

        public async Task<Lesson?> Delete(Guid id)
        {
            try
            {
                Lesson? u = await _context.Lessons.FindAsync(id);
                if (u != null)
                {
                    _context.Lessons.Remove(u);
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
