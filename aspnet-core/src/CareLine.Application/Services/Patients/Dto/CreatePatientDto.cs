using System;
using Abp.Application.Services.Dto;
using CareLine.Domain.Enum;

namespace CareLine.Services.Patients.Dto
{
    public class CreatePatientDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public int IdentityNo { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Gender Gender { get; set; }

    }
}
