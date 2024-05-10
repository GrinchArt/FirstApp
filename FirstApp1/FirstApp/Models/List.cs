namespace FirstApp.Models
{
    public class List
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Card> Cards { get; set; } = new List<Card>();
    }
}
