using System.ComponentModel.DataAnnotations;

namespace MemberTrack.Models
{
    public class Member
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string Password { get; set; }
        public bool IsAdmin { get; set; } // 新增字段
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public string? MemberLevel { get; set; }
        public string? Phone { get; set; }
        public int? Points { get; set; }
        public DateTime? RegistrationDate { get; set; }
        // 添加与 Order 的关系
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

