using System;
using System.Collections.Generic;

namespace EasyEnglishAPI.Models;

public partial class UserRelationship
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public Guid? RelatedUserId { get; set; }

    public int? RelationshipType { get; set; }

    public int? Status { get; set; }

    public virtual User? RelatedUser { get; set; }

    public virtual User? User { get; set; }
}
