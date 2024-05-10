using System.ComponentModel.DataAnnotations.Schema;

namespace FirstApp.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Priority { get; set; }
        [ForeignKey("List")]
        public int ListId { get; set; }
        public List List { get; set; }
    }
}
