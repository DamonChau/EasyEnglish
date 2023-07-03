using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface IFeedbackService
    {
        Task<Feedback?> GetFeedbacksByExamResult(Guid examResultId);
        Task<Feedback> AddFeedback(Feedback u);
        Task<Feedback> UpdateFeedback(Feedback u);
        Task<Feedback?> GetFeedback(Guid id);
        Task<Feedback?> DeleteFeedback(Guid id);

    }
}
