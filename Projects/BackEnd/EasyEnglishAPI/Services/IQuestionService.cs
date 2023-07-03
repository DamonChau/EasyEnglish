using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface IQuestionService
    {
        Task<IEnumerable<Question>> GetAllQuestionsByExamTest(Guid examTestId);
        Task<IEnumerable<Question>> GetAllQuestionsByExamTestWithQD(Guid examTestId);
        Task<IEnumerable<Question>> GetAllQuestions();
        Task<Question> AddQuestion(Question u);
        Task<Question> UpdateQuestion(Question u);
        Task<Question?> GetQuestion(Guid id);
        Task<Question?> Delete(Guid id);
    }
}
