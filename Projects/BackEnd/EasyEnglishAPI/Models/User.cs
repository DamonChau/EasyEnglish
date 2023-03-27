using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class User
    {
        public User()
        {
            ActionLogs = new HashSet<ActionLog>();
            ExamTests = new HashSet<ExamTest>();
            Excercises = new HashSet<Excercise>();
            Feedbacks = new HashSet<Feedback>();
            Improvements = new HashSet<Improvement>();
            Lessons = new HashSet<Lesson>();
            Questions = new HashSet<Question>();
            UserAnswers = new HashSet<UserAnswer>();
            UserNotes = new HashSet<UserNote>();
        }

        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string BillingAddress { get; set; }
        public int? UserType { get; set; }
        public string Description { get; set; }
        public int? Token { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<ActionLog> ActionLogs { get; set; }
        public virtual ICollection<ExamTest> ExamTests { get; set; }
        public virtual ICollection<Excercise> Excercises { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<Improvement> Improvements { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public virtual ICollection<UserAnswer> UserAnswers { get; set; }
        public virtual ICollection<UserNote> UserNotes { get; set; }
    }
}
