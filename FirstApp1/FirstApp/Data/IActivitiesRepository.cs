using FirstApp.Models;

namespace FirstApp.Data
{
    public interface IActivitiesRepository
    {
        Task<ActivityLog> LogActivity(ActivityLog activityLog);
        Task<IEnumerable<ActivityLog>> GetActivitiesByCardId(int cardId);
        Task<IEnumerable<ActivityLog>> GetAllActivities(int limit, int offset);
    }
}
