using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class Excercise
    {
        public Excercise()
        {
            ExcerciseQuestions = new HashSet<ExcerciseQuestion>();
            ImprovementExcercises = new HashSet<ImprovementExcercise>();
        }

        public Guid Id { get; set; }
        public string ExcerciseName { get; set; }
        public string Title { get; set; }
        public int? Level { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? LessonId { get; set; }
        public Guid? CatId { get; set; }

        public virtual ExcerciseCategory Cat { get; set; }
        public virtual User CreatedByNavigation { get; set; }
        public virtual Lesson Lesson { get; set; }
        public virtual ICollection<ExcerciseQuestion> ExcerciseQuestions { get; set; }
        public virtual ICollection<ImprovementExcercise> ImprovementExcercises { get; set; }
    }
}
