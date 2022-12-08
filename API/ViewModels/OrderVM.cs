using System.ComponentModel.DataAnnotations;

namespace API.ViewModels
{
    public class OrderVM
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string Status { get; set; }
    }
}
