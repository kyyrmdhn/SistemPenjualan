using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string Description { get; set; }
        public byte[]? ProductPic { get; set; }
        public DateTime? CreatedDate { get; set; }
        [JsonIgnore]
        public ICollection<OrderDetail>? OrderDetails { get; set; }
        [JsonIgnore]
        public ProductDetail? ProductDetail { get; set; }
    }
}
