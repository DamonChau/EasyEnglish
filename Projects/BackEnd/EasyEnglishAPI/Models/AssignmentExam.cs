using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class AssignmentExam
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public Guid? ExamTestId { get; set; }

    public bool? IsFavourite { get; set; }

    public bool? IsBookmarked { get; set; }

    public bool? IsDone { get; set; }

    public bool? IsAssigned { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ExamTest? ExamTest { get; set; }

    public virtual User? User { get; set; }
}
