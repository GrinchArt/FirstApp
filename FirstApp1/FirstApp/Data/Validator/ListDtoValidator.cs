
using FirstApp.Data.Dto;
using FluentValidation;

namespace FirstApp.Data.Validator
{
    public class ListDtoValidator : AbstractValidator<ListDto>
    {
        public ListDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("List name required");
        }
    }
}
