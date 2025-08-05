using System.Collections.Generic;
using CareLine.Domain.Enum;
using CareLine.Domain.Persons;
using CareLine.Domain.Tickets;

namespace CareLine.Domain.ClinicStaff
{
    public class Staff : Person
    {
        public string EmployeeNo { get; set; }
        public Gender Gender { get; set; }
        public string RoleName { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<StaffQueueAssignment> StaffQueueAssignments { get; set; }
    }
}
