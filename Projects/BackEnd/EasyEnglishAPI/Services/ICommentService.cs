using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface ICommentService
    {
        Task<IEnumerable<Comment>> GetAllCommentsByUser(Guid userId);
        Task<IEnumerable<Comment>> GetAllCommentsByExam(Guid examId);
        Task<Comment> AddComment(Comment u);
        Task<Comment?> DeleteComment(Guid id);
        Task<Comment> UpdateComment(Comment u);
        Task<Comment?> GetComment(Guid id);
    }
}
