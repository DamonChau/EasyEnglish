using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglish.Models
{
    public partial class QuestionAnswerKey
    {
        public Guid Id { get; set; }
        public Guid? QuestionId { get; set; }
        public Guid? QuestionAnswerId { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Question Question { get; set; }
        public virtual QuestionAnswer QuestionAnswer { get; set; }
    }
}
