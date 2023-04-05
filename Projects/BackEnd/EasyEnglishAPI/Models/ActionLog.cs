using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class ActionLog
{
    public Guid Id { get; set; }

    public string? Action { get; set; }

    public int? ActionType { get; set; }

    public string? Description { get; set; }

    public string? Value { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? CreatedBy { get; set; }

    public virtual User? CreatedByNavigation { get; set; }
}
