using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using CareLine.Authorization.Users;

namespace CareLine.Domain.Persons
{
    public abstract class Person : FullAuditedEntity<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public int IdentityNo { get; set; }
        public string Email { get; set; }

        [NotMapped]
        public string UserName { get; set; }
        [NotMapped]
        public string Password { get; set; }
        public virtual User UserAccount { get; set; }
    }
}
