using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class Lesson
    {
        public Lesson()
        {
            Excercises = new HashSet<Excercise>();
            ImprovementLessons = new HashSet<ImprovementLesson>();
        }

        public Guid Id { get; set; }
        public string LessonName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public int? LessonType { get; set; }
        public string HashTag { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? LessonCategory { get; set; }

        public virtual User CreatedByNavigation { get; set; }
        public virtual LessonCategory LessonCategoryNavigation { get; set; }
        public virtual ICollection<Excercise> Excercises { get; set; }
        public virtual ICollection<ImprovementLesson> ImprovementLessons { get; set; }
    }
}
