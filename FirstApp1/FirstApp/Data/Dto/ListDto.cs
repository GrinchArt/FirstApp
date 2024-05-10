namespace FirstApp.Data.Dto
{
    public class ListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<CardDto>? Cards { get; set; }
    }
}
