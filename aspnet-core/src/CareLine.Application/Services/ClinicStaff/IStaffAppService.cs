using System;
using Abp.Application.Services;
using CareLine.Services.ClinicStaff.Dto;

namespace CareLine.Services.ClinicStaff
{
    public interface IStaffAppService : IAsyncCrudAppService<StaffDto, Guid, GetStaffInput, CreateStaffDto, UpdateStaffDto>
    {
    }
}
