using System.Collections;
using System.Collections.Generic;
using CareLine.Domain.Enum;
using CareLine.Domain.Persons;
using CareLine.Domain.Tickets;

namespace CareLine.Domain.Patients
{
    public class Patient : Person
    {
        public Gender Gender { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}
