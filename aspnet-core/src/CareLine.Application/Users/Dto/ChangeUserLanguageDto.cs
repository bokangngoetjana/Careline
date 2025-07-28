using System.ComponentModel.DataAnnotations;

namespace CareLine.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}