﻿using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class UserAnswer
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public Guid? QuestionDetailId { get; set; }

    public string? Answer { get; set; }

    public int? Result { get; set; }

    public string? Description { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? Status { get; set; }

    public Guid? ExamResultId { get; set; }

    public virtual ExamResult? ExamResult { get; set; }

    public virtual QuestionDetail? QuestionDetail { get; set; }

    public virtual User? User { get; set; }
}
