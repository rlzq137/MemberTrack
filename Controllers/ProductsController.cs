using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MemberTrack.Data;
using System.Linq;
using System.Threading.Tasks;
using MemberTrack.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace MemberTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly YourDbContext _context;

        public ProductsController(YourDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(int pageNumber = 1, int pageSize = 10)
        {
            var products = await _context.Products
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalCount = await _context.Products.CountAsync();

            return Ok(new { products, totalCount });
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProducts(string name, int pageNumber = 1, int pageSize = 10)
        {
            var products = await _context.Products
                .Where(p => p.Name.Contains(name))
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalCount = await _context.Products.CountAsync(p => p.Name.Contains(name));

            return Ok(new { products, totalCount });
        }
        // POST: api/products/add
        [HttpPost("add")]
        public async Task<ActionResult<Product>> AddProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPost("order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            if (request == null || request.Quantity <= 0)
            {
                return BadRequest(new { message = "无效的订单数据" });
            }

            var memberId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var order = new Order
            {
                MemberId = memberId,
                ProductId = request.ProductId,
                Quantity = request.Quantity,
                OrderDate = DateTime.UtcNow,
                IsShipped = false // 默认未发货
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { message = "订单创建成功" });
        }

        public class CreateOrderRequest
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }
        }
        [HttpGet("my-orders")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var orders = await _context.Orders
                .Include(o => o.Product)
                .Where(o => o.MemberId == userId)
                .ToListAsync();

            return Ok(orders);
        }




    }
}
