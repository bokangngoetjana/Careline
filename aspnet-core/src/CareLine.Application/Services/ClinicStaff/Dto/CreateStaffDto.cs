using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using CareLine.Domain.ClinicStaff;
using CareLine.Domain.Enum;

namespace CareLine.Services.ClinicStaff.Dto
{
    [AutoMap(typeof(Staff))]
    public class CreateStaffDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public int IdentityNo { get; set; }
        public string Email { get; set; }
        public string EmployeeNo { get; set; }
        public string RoleName { get; set; }
        public Gender Gender { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
