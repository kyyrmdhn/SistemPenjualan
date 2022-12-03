using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class ProductDetail
    {
        public int Id { get; set; }
        [ForeignKey("Id")]
        public Product Product { get; set; }
        [Required]
        public int Stock { get; set; }
    }
}
