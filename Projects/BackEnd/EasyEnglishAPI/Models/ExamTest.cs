using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class ExamTest
{
    public Guid Id { get; set; }

    public string? Testname { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public string? Description { get; set; }

    public int? TestType { get; set; }

    public int? SectionType { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? CreatedBy { get; set; }

    public string? AudioFile { get; set; }

    public virtual ICollection<AssignmentExam> AssignmentExams { get; } = new List<AssignmentExam>();

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<ExamResult> ExamResults { get; } = new List<ExamResult>();

    public virtual ICollection<Question> Questions { get; } = new List<Question>();
}
