using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class LessonCategory
    {
        public LessonCategory()
        {
            Lessons = new HashSet<Lesson>();
        }

        public Guid Id { get; set; }
        public string CatName { get; set; }
        public string Description { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<Lesson> Lessons { get; set; }
    }
}
