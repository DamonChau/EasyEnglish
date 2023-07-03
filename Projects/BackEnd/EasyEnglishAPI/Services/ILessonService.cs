using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface ILessonService
    {
        Task<IEnumerable<Lesson>> GetAllLessons();
        Task<IEnumerable<Lesson>> GetAllLessonByType(int lessonType);
        Task<Lesson> AddLesson(Lesson u);
        Task<Lesson> UpdateLesson(Lesson u);
        Task<Lesson?> GetLesson(Guid id);
        Task<Lesson?> Delete(Guid id);

    }
}
