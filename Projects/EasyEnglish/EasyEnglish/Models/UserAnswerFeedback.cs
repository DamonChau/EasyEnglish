using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglish.Models
{
    public partial class UserAnswerFeedback
    {
        public Guid Id { get; set; }
        public Guid? FeedbackId { get; set; }
        public Guid? UserAnswerId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Feedback Feedback { get; set; }
        public virtual UserAnswer UserAnswer { get; set; }
    }
}
