using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CareLine.Domain.Patients;

namespace CareLine.Services.Patients.Dto
{
    [AutoMap(typeof(Patient))]
    public class UpdatePatientDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string UserName { get; set; }
    }
}
