using FirstApp.Data;
using FirstApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FirstApp.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityLogController : ControllerBase
    {
        private readonly IActivitiesRepository _activitiesRepository;

        public ActivityLogController(IActivitiesRepository activitiesRepository)
        {
            _activitiesRepository = activitiesRepository;
        }
        [HttpPost]
        public async Task<IActionResult> LogActivity(ActivityLog activityLog)
        {
            var loggedActivity = await _activitiesRepository.LogActivity(activityLog);
            return Ok(loggedActivity);
        }

        [HttpGet("{cardId}")]
        public async Task<IActionResult> GetActivitiesByCardId(int cardId)
        {
            var activities = await _activitiesRepository.GetActivitiesByCardId(cardId);
            return Ok(activities);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllActivities([FromQuery] int limit = 20, [FromQuery] int offset = 0)
        {
            var activities = await _activitiesRepository.GetAllActivities(limit, offset);
            return Ok(activities);
        }


    }
}
