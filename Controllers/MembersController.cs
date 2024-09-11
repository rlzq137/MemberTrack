using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MemberTrack.Data;
using MemberTrack.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace MemberTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly YourDbContext _context;
        private readonly ILogger<MembersController> _logger;
        private readonly IConfiguration _configuration;

        public MembersController(YourDbContext context, ILogger<MembersController> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Member>>> GetAllMembers(int pageNumber = 1, int pageSize = 10)
        {
            var members = await _context.Members
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalCount = await _context.Members.CountAsync();

            return Ok(new { members, totalCount });
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Member>>> SearchMembersByEmail(string email, int pageNumber = 1, int pageSize = 10)
        {
            var members = await _context.Members
                .Where(m => m.Email.Contains(email))
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalCount = await _context.Members.CountAsync(m => m.Email.Contains(email));

            return Ok(new { members, totalCount });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteMember([FromBody] DeleteMemberRequest request)
        {
            if (request == null || (request.Id <= 0 && string.IsNullOrEmpty(request.Email)))
            {
                return BadRequest(new { message = "无效的删除请求" });
            }

            Member member;
            if (request.Id > 0)
            {
                member = await _context.Members.FindAsync(request.Id);
            }
            else
            {
                member = await _context.Members.FirstOrDefaultAsync(m => m.Email == request.Email);
            }

            if (member == null)
            {
                return NotFound(new { message = "会员未找到" });
            }

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();

            return Ok(new { message = "会员删除成功" });
        }

        public class DeleteMemberRequest
        {
            public int Id { get; set; }
            public string Email { get; set; }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Member member)
        {
            if (member == null)
            {
                return BadRequest(new { message = "无效的用户数据" });
            }

            if (string.IsNullOrEmpty(member.Username) || string.IsNullOrEmpty(member.Email) || string.IsNullOrEmpty(member.Password))
            {
                return BadRequest(new { message = "用户名、邮箱和密码不能为空" });
            }

            try
            {
                _logger.LogInformation("注册请求开始处理");

                if (await _context.Members.AnyAsync(m => m.Email == member.Email))
                {
                    _logger.LogWarning("该邮箱已被注册: {Email}", member.Email);
                    return BadRequest(new { message = "该邮箱已被注册" });
                }

                member.RegistrationDate = DateTime.UtcNow; // 设置注册日期
                member.IsAdmin = false; // 默认不是管理员
                _context.Members.Add(member);
                await _context.SaveChangesAsync();

                _logger.LogInformation("注册成功: {Email}", member.Email);
                return Ok(new { message = "注册成功" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "注册时出错");
                return StatusCode(500, new { message = "服务器内部错误" });
            }
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var member = await _context.Members.FindAsync(int.Parse(userId));

            if (member == null)
            {
                return NotFound();
            }

            return Ok(member);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            if (loginModel == null)
            {
                return BadRequest(new { message = "无效的用户数据" });
            }

            var member = await _context.Members.SingleOrDefaultAsync(m => m.Email == loginModel.Email && m.Password == loginModel.Password);

            if (member == null)
            {
                return Unauthorized(new { message = "邮箱或密码不正确" });
            }

            _logger.LogInformation("用户登录成功: {Email}", loginModel.Email);

            // 添加一个字段以区分管理员和普通会员
            bool isAdmin = member.IsAdmin;

            // 生成JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, member.Id.ToString()),
                    new Claim(ClaimTypes.Role, isAdmin ? "Admin" : "User")
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { token = tokenString, isAdmin });
        }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
