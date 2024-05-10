using FirstApp.Data.Dto;
using FirstApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FirstApp.Data
{
    public interface ICardsRepository
    {
        Task<Card> GetCard(int cardId);
        Task<IEnumerable<Card>> GetCards();
        Task<Card> CreateCard(Card card);
        Task UpdateCard(int cardId,Card card);
        Task DeleteCard(int cardId);
        Task<IEnumerable<Card>> GetCardsByListId(int listId);
    }
}
