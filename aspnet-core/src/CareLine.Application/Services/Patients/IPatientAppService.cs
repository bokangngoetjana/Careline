using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using CareLine.Services.Patients.Dto;

namespace CareLine.Services.Patients
{
    public interface IPatientAppService : IAsyncCrudAppService<PatientDto, Guid, GetPatientInput, CreatePatientDto, UpdatePatientDto>
    {
        Task<PatientprofileDto> GetPatientProfileAsync();
    }
}
