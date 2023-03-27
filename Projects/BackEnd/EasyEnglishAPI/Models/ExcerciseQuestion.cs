using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class ExcerciseQuestion
    {
        public Guid Id { get; set; }
        public Guid? QuestionId { get; set; }
        public Guid? ExcerciseId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Excercise Excercise { get; set; }
        public virtual Question Question { get; set; }
    }
}
