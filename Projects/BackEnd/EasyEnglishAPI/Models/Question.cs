using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class Question
{
    public Guid Id { get; set; }

    public int? Order { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public string? Description { get; set; }

    public int? QuestionType { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? CreatedBy { get; set; }

    public Guid? ExamTestId { get; set; }

    public Guid? ExcerciseId { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ExamTest? ExamTest { get; set; }

    public virtual Excercise? Excercise { get; set; }

    public virtual ICollection<QuestionDetail> QuestionDetails { get; } = new List<QuestionDetail>();
}
