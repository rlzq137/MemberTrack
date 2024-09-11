using MemberTrack.Data;
using MemberTrack.Models;
using System.Linq;

namespace MemberTrack.Data
{
    public static class DbInitializer
    {
        public static void Initialize(YourDbContext context)
        {
            context.Database.EnsureCreated();

            // 检查是否已有管理员账户
            if (context.Members.Any(m => m.Email == "2653308383@qq.com"))
            {
                return; // 管理员账户已存在
            }

            var admin = new Member
            {
                Username = "admin",
                Email = "2653308383@qq.com",
                Password = "admin",
                IsAdmin = true
            };

            context.Members.Add(admin);
            context.SaveChanges();
        }
    }
}
