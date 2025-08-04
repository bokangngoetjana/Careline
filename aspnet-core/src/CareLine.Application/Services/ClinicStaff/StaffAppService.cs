using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using CareLine.Domain.ClinicStaff;
using CareLine.Services.ClinicStaff.Dto;
using Microsoft.EntityFrameworkCore;

namespace CareLine.Services.ClinicStaff
{
    public class StaffAppService : AsyncCrudAppService<Staff, StaffDto, Guid, GetStaffInput, CreateStaffDto, UpdateStaffDto>, IStaffAppService
    {
        private readonly StaffManager _staffManager;
        private readonly IRepository<Staff, Guid> _staffRepository;

        public StaffAppService(IRepository<Staff, Guid> staffRepository, StaffManager staffManager) : base(repository: staffRepository)
        {
            _staffManager = staffManager;
            _staffRepository = staffRepository;
        }
        public override async Task<StaffDto> CreateAsync(CreateStaffDto input)
        {
            try
            {
                var staff = await _staffManager.CreateStaffAsync(
                    input.UserName,
                    input.Name,
                    input.Surname,
                    input.Email,
                    input.Password,
                    input.IdentityNo,
                    input.EmployeeNo,
                    input.Gender,
                    input.RoleName);

                return ObjectMapper.Map<StaffDto>(staff);
            }
            catch(Exception ex)
            {
                throw new UserFriendlyException("An error occurred while creating staff: " + ex.Message, ex);
            }
        }
        public async Task<StaffProfileDto> GetStaffProfileAsync()
        {
            var staff = await _staffRepository
                .GetAll()
                .Include(s => s.UserAccount)
                .FirstOrDefaultAsync(s => s.UserAccount != null && s.UserAccount.Id == AbpSession.UserId.Value);

            if (staff == null)
            {
                throw new UserFriendlyException("Staff profile not found");
            }
            return new StaffProfileDto
            {
                Id = staff.Id,
                Name = staff.Name,
                Surname = staff.Surname,
                EmployeeNo = staff.EmployeeNo,
                UserName = staff.UserName,
            };
        }
    }
}
