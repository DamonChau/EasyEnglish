using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<IEnumerable<User>> GetAllTeachers(Guid userId);
        Task<Boolean> IsUserNameExists(string username);
        Task<User> AddUser(User u);
        Task<User> UpdateUserProfile(User u);
        Task<User> UpdateUser(User u);
        Task<User?> Login(User u);
        Task<User?> GetUserData(Guid id);
        Task<User?> DeleteUser(Guid id);

    }
}
