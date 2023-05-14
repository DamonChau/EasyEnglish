using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string? UserName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNo { get; set; }

    public string? Password { get; set; }

    public string? Address { get; set; }

    public string? BillingAddress { get; set; }

    public int? UserType { get; set; }

    public string? Description { get; set; }

    public int? Token { get; set; }

    public string? RefreshToken { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? LoginDate { get; set; }

    public string? AliasName { get; set; }

    public int? LoginType { get; set; }

    public virtual ICollection<ActionLog> ActionLogs { get; } = new List<ActionLog>();

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual ICollection<ExamResult> ExamResults { get; } = new List<ExamResult>();

    public virtual ICollection<ExamTest> ExamTests { get; } = new List<ExamTest>();

    public virtual ICollection<Feedback> Feedbacks { get; } = new List<Feedback>();

    public virtual ICollection<Improvement> Improvements { get; } = new List<Improvement>();

    public virtual ICollection<Lesson> Lessons { get; } = new List<Lesson>();

    public virtual ICollection<Question> Questions { get; } = new List<Question>();

    public virtual ICollection<UserAnswer> UserAnswers { get; } = new List<UserAnswer>();

    public virtual ICollection<UserNote> UserNotes { get; } = new List<UserNote>();
}
