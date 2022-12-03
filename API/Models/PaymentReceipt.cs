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
        public string PaymentMethod { get; set; }
        public int OrderId { get; set; }
        [JsonIgnore, ForeignKey("OrderId")]
        public Order Order { get; set; }
    }
}
