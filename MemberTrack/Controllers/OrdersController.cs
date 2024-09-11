using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MemberTrack.Data;
using MemberTrack.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;

namespace MemberTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly YourDbContext _context;

        public OrdersController(YourDbContext context)
        {
            _context = context;
        }

        [HttpGet("member")]
        public async Task<IActionResult> GetMemberOrders()
        {
            var memberId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var orders = await _context.Orders
                .Where(o => o.MemberId == memberId)
                .Include(o => o.Product)
                .Select(o => new
                {
                    o.OrderId,
                    ProductName = o.Product.Name,
                    o.Quantity,
                    o.OrderDate,
                    o.IsShipped
                })
                .ToListAsync();

            return Ok(orders);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllOrders(int pageNumber = 1, int pageSize = 10)
        {
            var orders = await _context.Orders
                .Include(o => o.Member)
                .Include(o => o.Product)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalCount = await _context.Orders.CountAsync();

            var orderDtos = orders.Select(order => new
            {
                order.OrderId,
                order.MemberId,
                order.ProductId,
                ProductName = order.Product.Name,
                order.Quantity,
                order.OrderDate,
                order.IsShipped,
                MemberEmail = order.Member.Email
            }).ToList();

            return Ok(new { orders = orderDtos, totalCount });
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{orderId}/ship")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] UpdateOrderStatusRequest request)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return NotFound(new { message = "订单未找到" });
            }

            order.IsShipped = request.IsShipped;
            await _context.SaveChangesAsync();

            return Ok(new { message = "订单状态更新成功" });
        }

        public class UpdateOrderStatusRequest
        {
            public bool IsShipped { get; set; }
        }
    }
}
