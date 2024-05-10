using AutoMapper;
using FirstApp.Data.Dto;
using FirstApp.Data;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FirstApp.Models;
using FluentValidation.Results;

namespace FirstApp.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    //sdfdsfsdfds
    public class CardsController : ControllerBase
    {
        private readonly ICardsRepository _cardRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<CardDto> _validator;

        public CardsController(ICardsRepository cardRepository, IMapper mapper, IValidator<CardDto> validator)
        {
            _cardRepository = cardRepository;
            _mapper = mapper;
            _validator = validator;
        }

        // GET: api/Cards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardDto>>> GetCards()
        {
            var cards = await _cardRepository.GetCards();
            var cardDtos = _mapper.Map<IEnumerable<CardDto>>(cards);
            return Ok(cardDtos);
        }

        // GET: api/Cards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CardDto>> GetCard(int id)
        {
            var card = await _cardRepository.GetCard(id);
            if (card == null)
            {
                return NotFound();
            }
            var cardDto = _mapper.Map<CardDto>(card);
            return Ok(cardDto);
        }

        //GET: api/Cards/List/5
        [HttpGet("List/{listId}")]
        public async Task<ActionResult<IEnumerable<CardDto>>> GetCardsByListId(int listId)
        {
            var cards = await _cardRepository.GetCardsByListId(listId);
            if(cards == null)
            {
                return NotFound();
            }
            var cardDtos = _mapper.Map<IEnumerable<CardDto>>(cards);
            return Ok(cardDtos);
        }


        // POST: api/Cards
        [HttpPost]
        public async Task<ActionResult<CardDto>> PostCard(CardDto cardDto)
        {
            ValidationResult results = _validator.Validate(cardDto);
            if (!results.IsValid)
            {
                return BadRequest(results.Errors);
            }

            try
            {
                var card = _mapper.Map<Card>(cardDto);
                card.DueDate = cardDto.GetUtcDueDate();
                card = await _cardRepository.CreateCard(card);
                var newCardDto = _mapper.Map<CardDto>(card);
                return CreatedAtAction("GetCard", new { id = newCardDto.Id }, newCardDto);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // PUT: api/Cards/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PatchCard(int id, CardDto cardDto)
        {
            if (id != cardDto.Id)
            {
                return BadRequest();
            }

            ValidationResult results = _validator.Validate(cardDto);
            if (!results.IsValid)
            {
                return BadRequest(results.Errors);
            }

            var card = _mapper.Map<Card>(cardDto);
            await _cardRepository.UpdateCard(id, card);

            return NoContent();
        }

        // DELETE: api/Cards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(int id)
        {
            await _cardRepository.DeleteCard(id);
            return NoContent();
        }
    }
}
