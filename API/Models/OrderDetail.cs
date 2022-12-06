using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        [ForeignKey("Id")]
        public Order Order { get; set; }
        [Required]
        public int Qty { get; set; }
        [Required]
        public int TotalPrice { get; set; }
        public int ProductId { get; set; }
        [JsonIgnore, ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}
