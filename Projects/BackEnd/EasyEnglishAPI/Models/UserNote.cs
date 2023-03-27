using System;
using System.Collections.Generic;

#nullable disable

namespace EasyEnglishAPI.Models
{
    public partial class UserNote
    {
        public UserNote()
        {
            UserAnswerNotes = new HashSet<UserAnswerNote>();
        }

        public Guid Id { get; set; }
        public string Content { get; set; }
        public int? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? CreatedBy { get; set; }

        public virtual User CreatedByNavigation { get; set; }
        public virtual ICollection<UserAnswerNote> UserAnswerNotes { get; set; }
    }
}
