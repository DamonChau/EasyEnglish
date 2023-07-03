using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface IQuestionDetailService
    {
        Task<IEnumerable<QuestionDetail>> GetAllByQuestions(Guid questionId);
        Task<IEnumerable<QuestionDetail>> GetAllQuestionDetails();
        Task<QuestionDetail> AddQuestionDetail(QuestionDetail u);
        Task<QuestionDetail> UpdateQuestionDetail(QuestionDetail u);
        Task<QuestionDetail?> GetQuestionDetail(Guid id);
        Task<QuestionDetail?> Delete(Guid id);

    }
}
