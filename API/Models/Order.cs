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
        public string? PaymentStatus { get; set; }
        public string? ReceivedStatus { get; set; }
        public int UserId { get; set; }
        [JsonIgnore, ForeignKey("UserId")]
        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual DeliveryOrder DeliveryOrder { get; set; }
        [JsonIgnore]
        public virtual PaymentReceipt PaymentReceipt { get; set; }
        [JsonIgnore]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
