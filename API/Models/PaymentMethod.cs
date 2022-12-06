using System.Text.Json.Serialization;

namespace API.Models
{
    public class PaymentMethod
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        [JsonIgnore]
        public virtual PaymentReceipt? PaymentReceipt { get; set; }
    }
}
