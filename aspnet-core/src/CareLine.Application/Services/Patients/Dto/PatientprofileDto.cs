using System;
using Abp.Application.Services.Dto;

namespace CareLine.Services.Patients.Dto
{
    public class PatientprofileDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public int IdentityNo { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
