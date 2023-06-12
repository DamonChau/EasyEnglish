using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class QuestionDetail
{
    public Guid Id { get; set; }

    public int? Order { get; set; }

    public int? Qno { get; set; }

    public string? Content { get; set; }

    public string? Answer { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? CreatedBy { get; set; }

    public Guid? QuestionId { get; set; }

    public virtual Question? Question { get; set; }

    public virtual ICollection<UserAnswer> UserAnswers { get; } = new List<UserAnswer>();
}
