using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface IExamTestsService
    {
        Task<IEnumerable<ExamTest>> GetAllExamTests();
        Task<IEnumerable<ExamTest>> GetAllExamTestsBySection(int testType, int sectionType);
        Task<ExamTest> AddExamTests(ExamTest u);
        Task<ExamTest> UpdateExamTests(ExamTest u);
        Task<ExamTest?> GetExamTests(Guid id);
        Task<ExamTest?> Delete(Guid id);

    }
}
