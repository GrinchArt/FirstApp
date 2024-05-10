using AutoMapper;
using FirstApp.Data;
using FirstApp.Data.Dto;
using FirstApp.Models;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FirstApp.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListsController : ControllerBase
    {
        private readonly IListsRepository _listRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<ListDto> _validator;

        public ListsController(IListsRepository listRepository, IMapper mapper, IValidator<ListDto> validator)
        {
            _listRepository = listRepository;
            _mapper = mapper;
            _validator = validator;
        }

        // GET: api/Lists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListDto>>> GetLists()
        {
            var lists = await _listRepository.GetLists();
            var listDtos = _mapper.Map<IEnumerable<ListDto>>(lists);
            return Ok(listDtos);
        }

        // GET: api/Lists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ListDto>> GetList(int id)
        {
            var list = _listRepository.GetList(id);
            if (list == null)
            {
                return NotFound();
            }
            var listDto = _mapper.Map<ListDto>(list);
            return Ok(listDto);
        }


        // POST: api/Lists
        [HttpPost]
        public async Task<ActionResult<ListDto>> PostList(ListDto listDto)
        {
            var results = _validator.Validate(listDto);
            if (!results.IsValid)
            {
                return BadRequest(results.Errors);
            }

            var list = _mapper.Map<List>(listDto);
            list = await _listRepository.CreateList(list);
            var newListDto = _mapper.Map<ListDto>(list);

            return CreatedAtAction("GetList", new { id = newListDto.Id }, newListDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutList(int id, ListDto listDto)
        {
            if (id != listDto.Id)
            {
                return BadRequest();
            }

            ValidationResult results = _validator.Validate(listDto);
            if (!results.IsValid)
            {
                return BadRequest(results.Errors);
            }

            var list = _mapper.Map<List>(listDto);
            await _listRepository.UpdateList(id, list);

            return NoContent();
        }

        // DELETE: api/Lists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteList(int id)
        {
            await _listRepository.DeleteList(id);
            return NoContent();
        }
    }
}
