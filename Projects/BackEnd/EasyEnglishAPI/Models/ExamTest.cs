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

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<Question> Questions { get; } = new List<Question>();
}
