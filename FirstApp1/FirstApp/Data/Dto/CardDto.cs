namespace FirstApp.Data.Dto
{
    public class CardDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Priority { get; set; }
        public int ListId { get; set; }

        public DateTime GetUtcDueDate()
        {
            return DateTime.SpecifyKind(DueDate, DateTimeKind.Utc);
        }
    }
}
