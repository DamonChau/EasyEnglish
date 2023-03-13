using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglish.Models
{
    public partial class QuestionUserAnswer
    {
        public Guid Id { get; set; }
        public Guid? QuestionId { get; set; }
        public Guid? UserAnswer { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Question Question { get; set; }
        public virtual UserAnswer UserAnswerNavigation { get; set; }
    }
}
