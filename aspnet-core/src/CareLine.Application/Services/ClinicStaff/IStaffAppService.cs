using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using CareLine.Services.ClinicStaff.Dto;

namespace CareLine.Services.ClinicStaff
{
    public interface IStaffAppService : IAsyncCrudAppService<StaffDto, Guid, GetStaffInput, CreateStaffDto, UpdateStaffDto>
    {
        Task<StaffProfileDto> GetStaffProfileAsync();
    }
}
