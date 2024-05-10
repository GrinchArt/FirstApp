
using FirstApp.Models;
using FluentValidation;

namespace FirstApp.Data.Validator
{
    public class CardValidator:AbstractValidator<Card>
    {
      public CardValidator() 
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Description).Length(0, 500);
            RuleFor(x => x.DueDate).NotEmpty();
            RuleFor(x => x.Priority).NotEmpty();
            RuleFor(x=>x.ListId).NotEmpty();
        }
    }
}
