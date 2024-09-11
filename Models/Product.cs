using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MemberTrack.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [MaxLength(200)]
        public string ImageURL { get; set; }
        [Required]
        public int Stock { get; set; }  // 新增字段：库存

        [Required]
        [MaxLength(100)]
        public string Category { get; set; }  // 新增字段：分类
                                              // 添加与 Order 的关系
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        public int MemberId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }
        [Required]
        public bool IsShipped { get; set; } = false; // 默认值为未发货

        [ForeignKey("MemberId")]
        public Member Member { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
 
    }
}
