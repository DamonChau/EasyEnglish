using System;
using System.Collections.Generic;
using System.Linq;
using EasyEnglish.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglish.DAL
{
    public class ExamTestsDAL
    {
        private readonly EasyEnglishContext _context;

        public ExamTestsDAL(EasyEnglishContext context)
        {
            _context = context;
        }
        public IEnumerable<ExamTest> GetAllExamTests()
        {
            try
            {
                return _context.ExamTests.ToList();
            }
            catch
            {
                throw;
            }
        }

        public int AddExamTests(ExamTest u)
        {
            try {

                u.Id = Guid.NewGuid();
                u.CreatedDate = DateTime.Now;
                _context.ExamTests.Add(u);
                _context.SaveChanges();
            return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateExamTests(ExamTest u)
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


        public ExamTest GetExamTests(Guid id)
        {
            try
            {
                ExamTest u = _context.ExamTests.Find(id);
                return u;
            }
            catch
            {
                throw;
            }
        }

        public int Delete(Guid id)
        {
            try
            {
                ExamTest u = _context.ExamTests.Find(id);
                _context.ExamTests.Remove(u);
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
