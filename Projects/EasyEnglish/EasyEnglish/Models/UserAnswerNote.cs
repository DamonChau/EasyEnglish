using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglish.Models
{
    public partial class UserAnswerNote
    {
        public Guid Id { get; set; }
        public Guid? UserNoteId { get; set; }
        public Guid? UserAnswerId { get; set; }
        public long? CreatedDate { get; set; }

        public virtual UserAnswer UserAnswer { get; set; }
        public virtual UserNote UserNote { get; set; }
    }
}
