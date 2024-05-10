using AutoMapper;
using FirstApp.Data.Dto;
using FirstApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FirstApp.Data
{
    public class AppDbRepository : ICardsRepository, IListsRepository, IActivitiesRepository
    {
        private readonly AppDbContext _context;

        public AppDbRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Card> CreateCard(Card card)
        {
            _context.Cards.Add(card);
            await _context.SaveChangesAsync();
            return card;
        }

        public async Task<List> CreateList(List list)
        {
            _context.Lists.Add(list);
            await _context.SaveChangesAsync();
            return list;
        }

        public async Task DeleteCard(int cardId)
        {
            var cardToDelete = await _context.Cards.FindAsync(cardId);
            if (cardToDelete != null)
            {
                _context.Cards.Remove(cardToDelete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteList(int listId)
        {
            var listToDelete = await _context.Lists.FindAsync(listId);
            if (listToDelete != null)
            {
                _context.Lists.Remove(listToDelete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<ActivityLog>> GetActivitiesByCardId(int cardId)
        {
            return await _context.Activities
                        .Where(a => a.CardId == cardId)
                        .OrderByDescending(a => a.Timestamp)
                        .ToListAsync();
        }

        public async Task<IEnumerable<ActivityLog>> GetAllActivities(int limit, int offset)
        {
            return await _context.Activities
                         .OrderByDescending(a => a.Timestamp)
                         .Skip(offset)
                         .Take(limit)
                         .ToListAsync();
        }

        public async Task<Card> GetCard(int cardId)
        {
            var card = await _context.Cards.FindAsync(cardId);
            if (card == null)
            {
                return null;
            }
            return card;
        }

        public async Task<IEnumerable<Card>> GetCards()
        {
            return await _context.Cards.ToListAsync();
        }

        public async Task<IEnumerable<Card>> GetCardsByListId(int listId)
        {
            return await _context.Cards.Where(x => x.ListId == listId).ToListAsync();
        }

        public async Task<List> GetList(int listId)
        {
            var list = await _context.Lists.FindAsync(listId);
            if (list==null)
            {
                return null;
            }
            return list;
        }

        public async Task<IEnumerable<List>> GetLists()
        {
            return await _context.Lists.ToListAsync();
        }

        public async Task<ActivityLog> LogActivity(ActivityLog activityLog)
        {
            if (activityLog == null)
            {
                return null;
            }
            activityLog.SetUtcTimeStamp();

            _context.Activities.Add(activityLog);
            await _context.SaveChangesAsync();
            return activityLog;
        }

        public async Task UpdateCard(int cardId, Card card)
        {
            var cardTemp = await _context.Cards.FindAsync(cardId);
            if (cardTemp != null)
            {
                _context.Entry(cardTemp).CurrentValues.SetValues(card);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateList(int listId, List list)
        {
            var listTemp = await _context.Lists.FindAsync(listId);
            if (listTemp!=null)
            {
                _context.Entry(listTemp).CurrentValues.SetValues(list);
                await _context.SaveChangesAsync();
            }
        }
    }
}
