using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglish.Models
{
    public partial class ExamTestQuestion
    {
        public Guid Id { get; set; }
        public Guid? ExamTestId { get; set; }
        public Guid? QuestionId { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ExamTest ExamTest { get; set; }
        public virtual Question Question { get; set; }
    }
}
