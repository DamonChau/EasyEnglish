using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class Improvement
    {
        public Improvement()
        {
            FeedbackImprovements = new HashSet<FeedbackImprovement>();
            ImprovementExcercises = new HashSet<ImprovementExcercise>();
            ImprovementLessons = new HashSet<ImprovementLesson>();
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }

        public virtual User CreatedByNavigation { get; set; }
        public virtual ICollection<FeedbackImprovement> FeedbackImprovements { get; set; }
        public virtual ICollection<ImprovementExcercise> ImprovementExcercises { get; set; }
        public virtual ICollection<ImprovementLesson> ImprovementLessons { get; set; }
    }
}
