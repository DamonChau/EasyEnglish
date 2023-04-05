using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class QuestionAnswer
{
    public Guid Id { get; set; }

    public string? Tag { get; set; }

    public string? Answer { get; set; }

    public string? Description { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }
}
