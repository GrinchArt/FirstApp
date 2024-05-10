using AutoMapper;
using FirstApp.Data.Dto;
using FirstApp.Models;

namespace FirstApp.Data.AutoMapper
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<FirstApp.Models.List, ListDto>();
            CreateMap<Card, CardDto>();

            CreateMap<ListDto, FirstApp.Models.List>();
            CreateMap<CardDto, Card>();
        }
    }
}
