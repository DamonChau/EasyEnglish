using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class ExerciseCategory
{
    public Guid Id { get; set; }

    public string? CatName { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<Exercise> Exercises { get; } = new List<Exercise>();
}
