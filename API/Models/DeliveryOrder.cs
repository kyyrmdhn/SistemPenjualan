using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class DeliveryOrder
    {
        [Key]
        public int Id { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string Status { get; set; }
        public int OrderId { get; set; }
        [JsonIgnore, ForeignKey("OrderId")]
        public virtual Order Order { get; set; }
    }
}
