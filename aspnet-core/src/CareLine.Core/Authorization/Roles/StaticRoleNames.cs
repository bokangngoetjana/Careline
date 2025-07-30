namespace CareLine.Authorization.Roles
{
    public static class StaticRoleNames
    {
        public static class Host
        {
            public const string Admin = "Admin";
        }

        public static class Tenants
        {
            public const string Admin = "Admin";
            public const string Patient = "Patient";
            public const string Doctor = "Doctor";
            public const string Nurse = "Nurse";
        }
    }
}
