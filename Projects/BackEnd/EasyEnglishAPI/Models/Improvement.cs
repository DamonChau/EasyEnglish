using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class Improvement
{
    public Guid Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Content { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? CreatedBy { get; set; }

    public Guid? FeedbackId { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual Feedback? Feedback { get; set; }
}
