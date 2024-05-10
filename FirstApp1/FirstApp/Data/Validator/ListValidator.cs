
using FluentValidation;

namespace FirstApp.Data.Validator
{
    public class ListValidator:AbstractValidator<FirstApp.Models.List>
    {
        public ListValidator() 
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("List name required");
        }
    }
}
