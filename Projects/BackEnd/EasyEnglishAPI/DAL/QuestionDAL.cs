﻿using EasyEnglishAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.DAL
{
    public class QuestionDAL
    {
        private readonly EasyEnglishContext _context;

        public QuestionDAL(EasyEnglishContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Question>> GetAllQuestions()
        {
            try
            {
                return await _context.Questions.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Question> AddQuestion(Question u)
        {
            try
            {
                _context.Questions.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Question> UpdateQuestion(Question u)
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

        public async Task<Question?> GetQuestion(Guid id)
        {
            try
            {
                return await _context.Questions.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<Question?> Delete(Guid id)
        {
            try
            {
                Question? u = await _context.Questions.FindAsync(id);
                if (u != null)
                {
                    _context.Questions.Remove(u);
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
