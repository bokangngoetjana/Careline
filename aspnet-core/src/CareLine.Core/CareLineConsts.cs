using CareLine.Debugging;

namespace CareLine
{
    public class CareLineConsts
    {
        public const string LocalizationSourceName = "CareLine";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "e77ed06859ed45bca07f58978cbf7376";
    }
}
