using System;
using System.Collections.Generic;
using System.Linq;
using EasyEnglishAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.DAL
{
    public class ExamTestsDAL
    {
        private readonly EasyEnglishContext _context;

        public ExamTestsDAL(EasyEnglishContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ExamTest>> GetAllExamTests()
        {
            try
            {
                return await _context.ExamTests.OrderBy(t => t.TestType)
                                                .ThenBy(t => t.SectionType)
                                                .ThenByDescending(t => t.CreatedDate)
                                                .ThenBy(t => t.Testname)
                                                .ThenBy(t => t.Title).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<ExamTest>> GetAllExamTestsBySection(int testType, int sectionType)
        {
            try
            {
                return await _context.ExamTests.Where(t => t.TestType == testType && t.SectionType == sectionType)
                                                .OrderBy(t => t.TestType)
                                                .ThenBy(t => t.SectionType)
                                                .ThenByDescending(t => t.CreatedDate)
                                                .ThenBy(t => t.Testname)
                                                .ThenBy(t => t.Title).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<ExamTest> AddExamTests(ExamTest u)
        {
            try
            {

                u.Id = Guid.NewGuid();
                u.CreatedDate = DateTime.Now;
                await _context.ExamTests.AddAsync(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<ExamTest> UpdateExamTests(ExamTest u)
        {
            try
            {
                u.CreatedDate = DateTime.Now;
                _context.Entry(u).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }


        public async Task<ExamTest?> GetExamTests(Guid id)
        {
            try
            {
                return await _context.ExamTests.FindAsync(id);

            }
            catch
            {
                throw;

            }
        }

        public async Task<ExamTest?> Delete(Guid id)
        {
            try
            {
                ExamTest? u = await _context.ExamTests.FindAsync(id);
                if (u != null)
                {
                    _context.ExamTests.Remove(u);
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
