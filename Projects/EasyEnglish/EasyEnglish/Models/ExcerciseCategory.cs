using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglish.Models
{
    public partial class ExcerciseCategory
    {
        public ExcerciseCategory()
        {
            Excercises = new HashSet<Excercise>();
        }

        public Guid Id { get; set; }
        public string CatName { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual ICollection<Excercise> Excercises { get; set; }
    }
}
