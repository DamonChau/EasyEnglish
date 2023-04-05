using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class LessonCategory
{
    public Guid Id { get; set; }

    public string? CatName { get; set; }

    public string? Description { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<Lesson> Lessons { get; } = new List<Lesson>();
}
