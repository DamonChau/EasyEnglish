using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface IUserAnswersService
    {
        Task<IEnumerable<UserAnswer>> GetAllByExam(Guid examResultId);
        Task<IEnumerable<UserAnswer>> GetAllUserAnswer();
        Task<UserAnswer> AddUserAnswer(UserAnswer u);
        Task<UserAnswer> UpdateUserAnswer(UserAnswer u);
        Task<UserAnswer?> GetUserAnswer(Guid id);
        Task<UserAnswer?> DeleteUserAnswer(Guid id);

    }
}
