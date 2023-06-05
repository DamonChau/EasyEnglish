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

        public async Task<IEnumerable<User>> GetAllTeachers(Guid userId)
        {
            try
            {

                return await _context.Users
                    .Where(u => u.UserType == 1 && u.Status == 1 && !_context.UserRelationships.Any(ur => ur.RelatedUserId == u.Id && ur.UserId == userId))
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Boolean> IsUserNameExists(string username)
        {
            try
            {
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                User u = await _context.Users.Where(u => u.UserName == username).FirstOrDefaultAsync();
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
                if (u is not null)
                    return true;

                return false;
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
                u.Id = Guid.NewGuid();
                u.Password = BCrypt.Net.BCrypt.HashPassword(u.Password);
                u.CreatedDate = DateTime.Now;
                u.Status = 1;
                u.UserType = 0;
                u.PhoneNo = u.PhoneNo is null ? "NA" : u.PhoneNo;
                u.Address = u.Address is null ? "NA" : u.Address;
                u.BillingAddress = u.BillingAddress is null ? "NA" : u.BillingAddress;
                u.Description = u.Description is null ? "NA" : u.Description;
                _context.Users.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;

            }
        }

        public async Task<User> UpdateUserProfile(User u)
        {
            try
            {
                User? existUser = await _context.Users.FindAsync(u.Id);
                if (existUser is not null)
                {
                    existUser.Email = u.Email;
                    existUser.PhoneNo = u.PhoneNo;
                    existUser.Address = u.Address;
                    existUser.BillingAddress = u.BillingAddress;
                    existUser.AliasName = u.AliasName;
                    existUser.Token = u.Token;
                    //change password for login user = system
                    if (existUser.LoginType == 0 && u.Password is not null && u.Password != string.Empty)
                    {
                        existUser.Password = BCrypt.Net.BCrypt.HashPassword(u.Password);
                    }
                    await _context.SaveChangesAsync();
                    return existUser;
                }
                throw new Exception("User is no longer exist");
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

        public async Task<User?> Login(User u)
        {
            try
            {
                if (u != null)
                {
                    using (var context = _context)
                    {
                        User? r = await _context.Users.SingleOrDefaultAsync(user => user.UserName == u.UserName);
                        if (r != null && r.Status == 1 && BCrypt.Net.BCrypt.Verify(u.Password, r.Password))
                        {
                            r.LoginDate = DateTime.Now;
                            r.RefreshToken = u.RefreshToken;
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
