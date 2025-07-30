using CareLine.Domain.Enum;
using CareLine.Domain.Persons;

namespace CareLine.Domain.Patients
{
    public class Patient : Person
    {
        public Gender Gender { get; set; }
    }
}
