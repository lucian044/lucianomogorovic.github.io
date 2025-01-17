using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Resume.Web.ViewModels;

namespace Resume.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResumeController : ControllerBase
    {
        private readonly ILogger<ResumeController> logger;

        public ResumeController(ILogger<ResumeController> logger)
        {
            this.logger = logger;
        }

        [HttpGet("GetExperiences")]
        public List<ExperienceViewModel> GetExperiences()
        {
            var experiences = new List<ExperienceViewModel>
            {
                new ExperienceViewModel 
                {
                    StartDate = "May 2018",
                    EndDate = null,
                    Title = "Software Developer",
                    Company = "Union Home Mortgage",
                    Description = "Full time position as software developer.",
                    Type = "Work"
                },
                new ExperienceViewModel 
                {
                    StartDate = "May 2017",
                    EndDate = "August 2017",
                    Title = "Software Development Intern",
                    Company = "Union Home Mortgage",
                    Description = "Second internship of college as software developer at a mortgage company.",
                    Type = "Intern"
                },
                new ExperienceViewModel 
                {
                    StartDate = "May 2016",
                    EndDate = "August 2016",
                    Title = "Software Development Intern",
                    Company = "Sanctuary Software",
                    Description = "First internship of college as software developer at a software company.",
                    Type = "Intern"
                }
            };

            return experiences;
        }

        [HttpGet("GetEducation")]
        public List<EducationViewModel> GetEducation()
        {
            var experiences = new List<EducationViewModel>
            {
                new EducationViewModel 
                {
                    StartDate = "August 2014",
                    EndDate = "May 2018",
                    School = "University of Akron",
                    DegreeType = "Bachelor's Degree",
                    FieldOfStudy = "Computer Science",
                    Description = "Full time position as software developer.",
                }
            };

            return experiences;
        }

        [HttpGet("GetSoftSkills")]
        public List<string> GetSoftSkills()
        {
            var softSkills = new List<string>
            {
                "Creative",
                "Team Player",
                "Open Minded",
                "Over Comunicator",
                "Problem Solver"
            };

            return softSkills;
        }
        
        [HttpGet("GetHardSkills")]
        public List<string> GetHardSkills()
        {
            var softSkills = new List<string>
            {
                "HTML",
                "CSS",
                "React",
                "Redux",
                "C#",
                ".NET",
                "SQL",
                "Azure Dev/Ops"
            };

            return softSkills;
        }
    }
}