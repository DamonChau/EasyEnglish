using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.Services
{
    public class UserRelationshipService : IUserRelationshipService
    {
        private readonly EasyEnglishContext _context;

        public UserRelationshipService(EasyEnglishContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserRelationship>> GetAllByUser(Guid userId)
        {
            try
            {
                return await _context.UserRelationships.Where(u => u.UserId == userId).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<UserRelationship>> GetAllTeachersByUser(Guid userId)
        {
            try
            {
                return await _context.UserRelationships
                    .Where(u => u.UserId == userId && u.RelationshipType == 0)
                    .Include(u => u.RelatedUser)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<UserRelationship>> GetAllStudentsByUser(Guid userId)
        {
            try
            {
                return await _context.UserRelationships
                    .Where(u => u.RelatedUserId == userId && u.RelationshipType == 0)
                    .Include(u => u.User)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserRelationship> AddUserRelationship(UserRelationship u)
        {
            try
            {
                u.Id = Guid.NewGuid();
                _context.UserRelationships.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserRelationship> UpdateStatus(UserRelationship u)
        {
            try
            {
                UserRelationship? existUser = await _context.UserRelationships.FindAsync(u.Id);
                if (existUser is not null) {
                    existUser.Status = u.Status;
                    await _context.SaveChangesAsync();
                    return existUser;
                }
                
                throw new Exception("UserRelationship is no longer exist");
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserRelationship> UpdateUserRelationship(UserRelationship u)
        {
            try
            {
                _context.Entry(u).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserRelationship?> GetUserRelationship(Guid id)
        {
            try
            {
                return await _context.UserRelationships.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserRelationship?> DeleteUserRelationship(Guid id)
        {
            try
            {
                UserRelationship? u = await _context.UserRelationships.FindAsync(id);
                if (u != null)
                {
                    _context.UserRelationships.Remove(u);
                    await _context.SaveChangesAsync();
                }
                return null;
            }
            catch
            {
                throw;
            }
        }
    }
}
