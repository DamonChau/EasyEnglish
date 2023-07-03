using EasyEnglishAPI.Models;

namespace EasyEnglishAPI.Services
{
    public interface IAssignmentExamService
    {
        Task<AssignmentExam?> GetByUsers(Guid? userid, Guid? examId);
        Task<IEnumerable<AssignmentExam>> GetAllByStatusWithDetailIsFav(Guid? userid);
        Task<IEnumerable<AssignmentExam>> GetAllByStatusWithDetailIsBookmarked(Guid? userid);
        Task<IEnumerable<AssignmentExam>> GetAllByStatusWithDetailIsAssigned(Guid? userid);
        Task<IEnumerable<AssignmentExam>> GetAllByStatusWithDetailIsDone(Guid? userid);
        Task<AssignmentExam> AddAssignmentExam(AssignmentExam u);
        Task<AssignmentExam> UpdateAssignmentExam(AssignmentExam u);
        Task<AssignmentExam?> GetAssignmentExam(Guid id);
        Task<AssignmentExam?> Delete(Guid id);

    }
}
