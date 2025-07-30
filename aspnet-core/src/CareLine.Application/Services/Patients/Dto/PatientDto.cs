using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CareLine.Domain.Enum;
using CareLine.Domain.Patients;

namespace CareLine.Services.Patients.Dto
{
    [AutoMap(typeof(Patient))]
    public class PatientDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public int IdentityNo { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
    }
}
