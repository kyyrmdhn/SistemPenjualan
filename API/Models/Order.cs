using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int UserId { get; set; }
        [JsonIgnore, ForeignKey("UserId")]
        public User User { get; set; }
        [JsonIgnore]
        public DeliveryOrder DeliveryOrder { get; set; }
        [JsonIgnore]
        public PaymentReceipt PaymentReceipt { get; set; }
        [JsonIgnore]
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
