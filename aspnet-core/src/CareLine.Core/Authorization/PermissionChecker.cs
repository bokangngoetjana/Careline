using Abp.Authorization;
using CareLine.Authorization.Roles;
using CareLine.Authorization.Users;

namespace CareLine.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
