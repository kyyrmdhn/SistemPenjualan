using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class PaymentReceipt
    {
        [Key]
        public int Id { get; set; }
        public DateTime PaymentDate { get; set; }
        public int PaymentId { get; set; }
        [JsonIgnore, ForeignKey("PaymentId")]
        public virtual PaymentMethod PaymentMethod { get; set; }
        public int OrderId { get; set; }
        [JsonIgnore, ForeignKey("OrderId")]
        public virtual Order Order { get; set; }
    }
}
