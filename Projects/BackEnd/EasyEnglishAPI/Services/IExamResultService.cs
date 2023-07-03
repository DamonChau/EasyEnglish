using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface IExamResultService
    {
        Task<IEnumerable<ExamResult>> GetAllResultsByExamTest(Guid examTestId);
        Task<IEnumerable<ExamResult>> GetAllResultsByExamTestDetail(Guid examTestId);
        Task<IEnumerable<ExamResult>> GetAllResultByUser(Guid userId);
        Task<IEnumerable<ExamResult>> GetTop3ResultsByUser(Guid userId, Guid examTestId);
        Task<ExamResult> AddExamResult(ExamResult u);
        Task<ExamResult> UpdateExamResult(ExamResult u);
        Task<ExamResult?> GetExamResult(Guid id);
        Task<ExamResult?> Delete(Guid id);

    }
}
