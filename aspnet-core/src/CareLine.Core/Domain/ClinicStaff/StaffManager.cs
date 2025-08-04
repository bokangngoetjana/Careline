using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using CareLine.Authorization.Users;
using CareLine.Domain.Enum;

namespace CareLine.Domain.ClinicStaff
{
    public class StaffManager : DomainService
    {
        private readonly IRepository<Staff, Guid> _staffRepository;
        private readonly UserManager _userManager;

        public StaffManager(IRepository<Staff, Guid> staffRepository, UserManager userManager)
        {
            _staffRepository = staffRepository;
            _userManager = userManager;
        }
        public async Task<Staff> CreateStaffAsync(
            string username,
            string name,
            string surname,
            string email,
            string password,
            int identityNo,
            string employeeNo,
            Gender gender,
            string roleName)
        {
            var user = new User
            {
                UserName = username,
                EmailAddress = email,
                Name = name,
                Surname = surname,
                IsActive = true
            };

            var userCreationResult = await _userManager.CreateAsync(user, password);
            if(!userCreationResult.Succeeded)
            {
                throw new Exception("User creation failed: " + string.Join(", ", userCreationResult.Errors.Select(e => e.Description)));
            }

            await _userManager.AddToRoleAsync(user, roleName);

            var staff = new Staff
            {
                Name = name,
                Surname = surname,
                Email = email,
                IdentityNo = identityNo,
                Gender = gender,
                EmployeeNo = employeeNo,
                RoleName = roleName,
                UserAccount = user
            };

            await _staffRepository.InsertAsync(staff);
            return staff;

        }

    }
}
