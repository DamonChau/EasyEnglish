using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface IUserNotesService
    {
        Task<IEnumerable<UserNote>> GetAllUserNotesByUser(Guid userId);
        Task<IEnumerable<UserNote>> GetAllUserNotesByExamResult(Guid examResultId);
        Task<UserNote> AddUserNote(UserNote u);
        Task<UserNote> UpdateUserNote(UserNote u);
        Task<UserNote?> GetUserNote(Guid id);
        Task<UserNote?> DeleteUserNote(Guid id);

    }
}
