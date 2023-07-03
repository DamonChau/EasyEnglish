using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface IUserRelationshipService
    {
        Task<IEnumerable<UserRelationship>> GetAllByUser(Guid userId);
        Task<IEnumerable<UserRelationship>> GetAllTeachersByUser(Guid userId);
        Task<IEnumerable<UserRelationship>> GetAllStudentsByUser(Guid userId);
        Task<UserRelationship> AddUserRelationship(UserRelationship u);
        Task<UserRelationship> UpdateStatus(UserRelationship u);
        Task<UserRelationship> UpdateUserRelationship(UserRelationship u);
        Task<UserRelationship?> GetUserRelationship(Guid id);
        Task<UserRelationship?> DeleteUserRelationship(Guid id);

    }
}
