using System;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using CareLine.Services.Patients.Dto;

namespace CareLine.Services.Patients
{
    public interface IPatientAppService : IAsyncCrudAppService<PatientDto, Guid, GetPatientInput, CreatePatientDto, UpdatePatientDto>
    {
    }
}
