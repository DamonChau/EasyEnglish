using System;
using System.Collections.Generic;
using System.Linq;
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
        public IEnumerable<User> GetAllUsers()
        {
            try
            {
                return _context.Users.ToList();
            }
            catch
            {
                throw;
            }
        }
        
        public int AddUser(User u)
        {
            try
            {
                _context.Users.Add(u);
                _context.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        
        public int UpdateUser(User u)
        {
            try
            {
                _context.Entry(u).State = EntityState.Modified;
                _context.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateUserM(User u)
        {
            try
            {
                using (var context = _context)
                {
                    var user = context.Users.Find(u.Id);

                    user.UserName = u.UserName;
                    user.Status = u.Status;
                    user.CreatedDate = DateTime.Now;

                    context.SaveChanges();
                }
                return 1;
            }
            catch
            {

                throw;
            }
        }

        
        public User Login(User u)
        {
            try
            {
                User r = _context.Users.SingleOrDefault(user => user.UserName == u.UserName);
                if (r != null && r.Password == u.Password)
                {
                    return r;

                }
                return null;
            }
            catch
            {
                throw;
            }
        }

        
        public User GetUserData(Guid id)
        {
            try
            {
                User u = _context.Users.Find(id);
                return u;
            }
            catch
            {
                throw;
            }
        }
        
        public int DeleteUser(Guid id)
        {
            try
            {
                User u = _context.Users.Find(id);
                _context.Users.Remove(u);
                _context.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
