﻿namespace API.ViewModel
{
    public class RegisterVM
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
        public int RoleId { get; set; }
    }
}
