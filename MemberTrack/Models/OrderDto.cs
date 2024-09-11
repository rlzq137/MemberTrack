public class OrderDto
{
    public int OrderId { get; set; }
    public int MemberId { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public DateTime OrderDate { get; set; }
    public bool IsShipped { get; set; }
}
