using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class ExamResult
{
    public Guid Id { get; set; }

    public Guid? ExamTestId { get; set; }

    public int? Score { get; set; }

    public int? NoQuestion { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? CreatedBy { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ExamTest? ExamTest { get; set; }

    public virtual ICollection<Feedback> Feedbacks { get; } = new List<Feedback>();

    public virtual ICollection<UserAnswer> UserAnswers { get; } = new List<UserAnswer>();

    public virtual ICollection<UserNote> UserNotes { get; } = new List<UserNote>();
}
