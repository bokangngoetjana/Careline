using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using CareLine.Authorization.Users;
using CareLine.Domain.Enum;

namespace CareLine.Domain.Patients
{
    public class PatientManager : DomainService
    {
        private readonly IRepository<Patient, Guid> _patientRepository;
        private readonly UserManager _userManager;

        public PatientManager(IRepository<Patient, Guid> patientRepository, UserManager userManager)
        {
            _patientRepository = patientRepository;
            _userManager = userManager;
        }
        public async Task<Patient> CreatePatientAsync(string username, string name, string surname, string email,string password, int identityNo, Gender gender)
        {
            // 1. Create ABP User for login
            var user = new User
            {
                UserName = username,
                EmailAddress = email,
                Name = name,
                Surname = surname,
                IsActive = true
            };

            var userCreationResult = await _userManager.CreateAsync(user, password);
            if (!userCreationResult.Succeeded)
            {
                throw new Exception("User creation failed: " + string.Join(", ", userCreationResult.Errors.Select(e => e.Description)));
            }

            // 2. Assign user to the patient role
            await _userManager.AddToRoleAsync(user, "Patient");

            var patient = new Patient
            {
                Name = name,
                Surname = surname,
                Email = email,
                IdentityNo = identityNo,
                Gender = gender,
                UserAccount = user
            };
            // 3. Associate the user with the patient
            await _patientRepository.InsertAsync(patient);
            return patient;
        }
    }
}
