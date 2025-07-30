using CareLine.Domain.Enum;
using CareLine.Domain.Persons;

namespace CareLine.Domain.ClinicStaff
{
    public class Staff : Person
    {
        public string EmployeeNo { get; set; }
        public Gender Gender { get; set; }
        public string RoleName { get; set; }
    }
}
