using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class Question
    {
        public Question()
        {
            ExamTestQuestions = new HashSet<ExamTestQuestion>();
            ExcerciseQuestions = new HashSet<ExcerciseQuestion>();
            QuestionAnswerKeys = new HashSet<QuestionAnswerKey>();
            QuestionUserAnswers = new HashSet<QuestionUserAnswer>();
        }

        public Guid Id { get; set; }
        public string Tag { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public int? QuestionType { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }

        public virtual User CreatedByNavigation { get; set; }
        public virtual ICollection<ExamTestQuestion> ExamTestQuestions { get; set; }
        public virtual ICollection<ExcerciseQuestion> ExcerciseQuestions { get; set; }
        public virtual ICollection<QuestionAnswerKey> QuestionAnswerKeys { get; set; }
        public virtual ICollection<QuestionUserAnswer> QuestionUserAnswers { get; set; }
    }
}
