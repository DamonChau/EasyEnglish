using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class UserAnswer
    {
        public UserAnswer()
        {
            QuestionUserAnswers = new HashSet<QuestionUserAnswer>();
            UserAnswerFeedbacks = new HashSet<UserAnswerFeedback>();
            UserAnswerNotes = new HashSet<UserAnswerNote>();
        }

        public Guid Id { get; set; }
        public Guid? UserId { get; set; }
        public string Tag { get; set; }
        public string Answer { get; set; }
        public int? Result { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? Status { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<QuestionUserAnswer> QuestionUserAnswers { get; set; }
        public virtual ICollection<UserAnswerFeedback> UserAnswerFeedbacks { get; set; }
        public virtual ICollection<UserAnswerNote> UserAnswerNotes { get; set; }
    }
}
