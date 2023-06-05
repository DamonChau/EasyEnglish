using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class Lesson
{
    public Guid Id { get; set; }

    public string? LessonName { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Content { get; set; }

    public int? LessonType { get; set; }

    public string? HashTag { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public Guid? CreatedBy { get; set; }

    public Guid? LessonCategory { get; set; }

    public virtual ICollection<AssignmentLesson> AssignmentLessons { get; } = new List<AssignmentLesson>();

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<Exercise> Exercises { get; } = new List<Exercise>();

    public virtual LessonCategory? LessonCategoryNavigation { get; set; }
}
