﻿using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class ExcerciseCategory
{
    public Guid Id { get; set; }

    public string? CatName { get; set; }

    public int? Status { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<Excercise> Excercises { get; } = new List<Excercise>();
}
