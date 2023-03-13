using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglish.Models
{
    public partial class ExamTest
    {
        public ExamTest()
        {
            ExamTestQuestions = new HashSet<ExamTestQuestion>();
        }

        public Guid Id { get; set; }
        public string Testname { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public int? TestType { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }

        public virtual User CreatedByNavigation { get; set; }
        public virtual ICollection<ExamTestQuestion> ExamTestQuestions { get; set; }
    }
}
