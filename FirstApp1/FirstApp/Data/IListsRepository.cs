namespace FirstApp.Data
{
    public interface IListsRepository
    {
        Task<FirstApp.Models.List> GetList(int listId);
        Task<IEnumerable<FirstApp.Models.List>> GetLists();
        Task<FirstApp.Models.List> CreateList(FirstApp.Models.List list);
        Task UpdateList(int listId,FirstApp.Models.List list);
        Task DeleteList(int listId);
    }
}
