using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using CareLine.Domain.Enum;

namespace CareLine.Services.Patients.Dto
{
    public class PatientprofileDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public int IdentityNo { get; set; }
        public string UserName { get; set; }
    }
}
