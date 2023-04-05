using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class UserNote
{
    public Guid Id { get; set; }

    public string? Content { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? CreatedBy { get; set; }

    public Guid? UserAnswerId { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual UserAnswer? UserAnswer { get; set; }
}
