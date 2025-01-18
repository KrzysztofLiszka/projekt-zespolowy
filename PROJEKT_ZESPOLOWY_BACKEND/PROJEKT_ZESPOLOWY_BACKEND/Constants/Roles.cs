namespace PROJEKT_ZESPOLOWY_BACKEND.Constants
{
    public static class Roles
    {
        public const string SystemAdmin = "SystemAdmin";
        public const string WorkspaceOwner = "WorkspaceOwner";
        public const string Accountant = "Accountant";
        public const string Worker = "Worker";

        private static readonly Dictionary<string, string> PolishToEnglishRoleMapping = new Dictionary<string, string>
        {
            { "Admin systemu", SystemAdmin },
            { "Właściciel firmy", WorkspaceOwner },
            { "Księgowy", Accountant },
            { "Członek projektu", Worker }
        };

        public static string GetEnglishRoleNameFromPolish(string roleName)
        {
            return PolishToEnglishRoleMapping.ContainsKey(roleName) ? PolishToEnglishRoleMapping[roleName] : roleName;
        }

        public static string GetPolishRoleName(string roleName)
        {
            var reverseMapping = PolishToEnglishRoleMapping.FirstOrDefault(x => x.Value == roleName).Key;
            return reverseMapping ?? roleName;
        }
    }
}
