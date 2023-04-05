using EasyEnglishAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.DAL
{
    public class UserDAL
    {
        private readonly EasyEnglishContext _context;

        public UserDAL(EasyEnglishContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            try
            {
                return await _context.Users.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<User> AddUser(User u)
        {
            try
            {
                _context.Users.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<User> UpdateUser(User u)
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

        public async Task<User> UpdateUserM(User u)
        {
            try
            {
                using (var context = _context)
                {
                    var user = await context.Users.FindAsync(u.Id);
                    if (user != null)
                    {

                        user.UserName = u.UserName;
                        user.Status = u.Status;
                        user.CreatedDate = DateTime.Now;

                        await context.SaveChangesAsync();
                    }
                }
                return u;
            }
            catch
            {

                throw;
            }
        }

        public async Task<User?> Login(User u)
        {
            try
            {
                if (u != null)
                {
                    using (var context = _context)
                    {
                        User? r = await _context.Users.SingleOrDefaultAsync(user => user.UserName == u.UserName);
                        if (r != null && r.Password == u.Password)
                        {
                            r.LoginDate = DateTime.Now;
                            await context.SaveChangesAsync();
                            return r;
                        }
                        return null;
                    }
                }
                return null;
            }
            catch
            {
                throw;
            }
        }

        public async Task<User?> GetUserData(Guid id)
        {
            try
            {
               return await _context.Users.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<User?> DeleteUser(Guid id)
        {
            try
            {
                User? u = await _context.Users.FindAsync(id);
                if (u != null)
                {
                    _context.Users.Remove(u);
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
