using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class Comment
{
    public Guid Id { get; set; }

    public string? Content { get; set; }

    public Guid? ExamTestId { get; set; }

    public Guid? CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? ParentId { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ExamTest? ExamTest { get; set; }

    public virtual ICollection<Comment> InverseParent { get; } = new List<Comment>();

    public virtual Comment? Parent { get; set; }
}
