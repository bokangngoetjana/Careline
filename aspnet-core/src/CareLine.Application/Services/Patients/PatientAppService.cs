using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using CareLine.Domain.Patients;
using CareLine.Services.Patients.Dto;
using Microsoft.EntityFrameworkCore;

namespace CareLine.Services.Patients
{
    public class PatientAppService : AsyncCrudAppService<Patient, PatientDto, Guid, GetPatientInput, CreatePatientDto, UpdatePatientDto>, IPatientAppService
    {
        private readonly PatientManager _patientManager;
        private readonly IRepository<Patient, Guid> _patientRepository;
        public PatientAppService(IRepository<Patient, Guid> patientRepository, PatientManager patientManager) : base(repository: patientRepository)
        {
            _patientRepository = patientRepository;
            _patientManager = patientManager;
        }
        public async Task<PatientprofileDto> GetPatientProfileAsync()
        {
            var patient = await _patientRepository
                .GetAll()
                .Include(s => s.UserAccount) 
                .FirstOrDefaultAsync(s => s.UserAccount != null && s.UserAccount.Id == AbpSession.UserId.Value);

            if (patient == null)
            {
                throw new UserFriendlyException("Patient profile not found.");
            }

            return new PatientprofileDto
            {
                Id = patient.Id,
                Name = patient.Name,
                Surname = patient.Surname,
                UserName = patient.UserAccount.UserName,
                IdentityNo = patient.IdentityNo,
                Email = patient.Email
            };
        }
        public override async Task<PatientDto> CreateAsync(CreatePatientDto input)
        {
            try
            {
                var patient = await _patientManager.CreatePatientAsync(
                    input.UserName,
                    input.Name,
                    input.Surname,
                    input.Email,
                    input.Password,
                    input.IdentityNo,
                    input.Gender
                   );

                return ObjectMapper.Map<PatientDto>(patient);
            }
            catch(Exception ex)
            {
                throw new UserFriendlyException("An error occured while creating patient.");
            }
        }
    }
}
