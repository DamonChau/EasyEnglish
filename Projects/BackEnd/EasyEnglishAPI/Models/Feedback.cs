using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class Feedback
    {
        public Feedback()
        {
            FeedbackImprovements = new HashSet<FeedbackImprovement>();
            UserAnswerFeedbacks = new HashSet<UserAnswerFeedback>();
        }

        public Guid Id { get; set; }
        public string Content { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }

        public virtual User CreatedByNavigation { get; set; }
        public virtual ICollection<FeedbackImprovement> FeedbackImprovements { get; set; }
        public virtual ICollection<UserAnswerFeedback> UserAnswerFeedbacks { get; set; }
    }
}
