using Microsoft.VisualBasic;

namespace FirstApp.Models
{
    public class ActivityLog
    {
        public int Id { get; set; }
        public int? CardId { get; set; }
        public string ActionName { get; set; }
        public string Details { get; set; }
        public DateTime Timestamp { get; set; }
        public void SetUtcTimeStamp()
        {
            Timestamp = DateTime.SpecifyKind(Timestamp, DateTimeKind.Utc);
        }
    }
}
