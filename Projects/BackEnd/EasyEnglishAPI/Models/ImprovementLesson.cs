using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class ImprovementLesson
    {
        public Guid Id { get; set; }
        public Guid? Improvement { get; set; }
        public Guid? Lesson { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Improvement ImprovementNavigation { get; set; }
        public virtual Lesson LessonNavigation { get; set; }
    }
}
