using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [JsonIgnore]
<<<<<<< HEAD
        public virtual ICollection<User> User { get; set; }
=======
        public virtual User? User { get; set; }
>>>>>>> bdfa4c6783cddfd296bd5c43af69a05e2522fba4
    }
}
