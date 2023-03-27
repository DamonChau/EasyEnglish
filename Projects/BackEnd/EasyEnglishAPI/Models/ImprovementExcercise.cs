using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class ImprovementExcercise
    {
        public Guid Id { get; set; }
        public Guid? ImprovementId { get; set; }
        public Guid? ExcerciseId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Excercise Excercise { get; set; }
        public virtual Improvement Improvement { get; set; }
    }
}
