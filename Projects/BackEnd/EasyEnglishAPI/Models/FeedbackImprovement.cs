using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class FeedbackImprovement
    {
        public Guid Id { get; set; }
        public Guid? FeedbackId { get; set; }
        public Guid? ImprovementId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Feedback Feedback { get; set; }
        public virtual Improvement Improvement { get; set; }
    }
}
