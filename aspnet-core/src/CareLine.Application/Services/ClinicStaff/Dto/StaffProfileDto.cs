using System;
using Abp.Application.Services.Dto;

namespace CareLine.Services.ClinicStaff.Dto
{
    public class StaffProfileDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string EmployeeNo { get; set; }
        public string UserName { get; set; }
    }
}
