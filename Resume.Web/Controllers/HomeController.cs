using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using Resume.Web.ViewModels;

namespace Resume.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetAboutMe")]
        public AboutMeViewModel GetAboutMe()
        {
            var aboutMe = new AboutMeViewModel
            {
                FirstName = "Luciano",
                LastName = "Mogorovic",
                Description = "“ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ! “",
                Title = "Software Developer",
                Birthday = new DateTime(1995, 10, 14),
                PhoneNumber = "(216) 659-1931",
                Email = "lmogorovic44@gmail.com",
                Website = "www.lucianomogorovic.dev",
                StreetAddress = "1553 Warren Road",
                City = "Lakewood",
                State = "Ohio",
                ZipCode = "44107"
            };

            return aboutMe;
        }
    }
}
