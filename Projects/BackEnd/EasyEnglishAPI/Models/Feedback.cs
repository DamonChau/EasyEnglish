using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class Feedback
{
    public Guid Id { get; set; }

    public string? Content { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? CreatedBy { get; set; }

    public Guid? ExamResultId { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ExamResult? ExamResult { get; set; }

    public virtual ICollection<Improvement> Improvements { get; } = new List<Improvement>();
}
