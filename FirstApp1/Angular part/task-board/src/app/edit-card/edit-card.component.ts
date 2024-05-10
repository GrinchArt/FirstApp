import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent {
  private _card!: Card;
  lists: List[] = [];


  @Input()
  set card(value: Card) {
    this._card = value;
    console.log('Card set in EditCardComponent:', this._card);
  }
  get card(): Card {
    return this._card;
  }


  @Output() cardUpdated = new EventEmitter<Card>();
  showEditModal: boolean = false;

  constructor(private cardService: CardService,private listService: ListService) {}
ngOnInit(): void {
  this.fetchLists();
}
fetchLists(): void {
  this.listService.getLists().subscribe(lists => {
    this.lists = lists;
    console.log('Lists loaded:', lists);
  }, error => {
    console.error('Failed to load lists:', error);
  });
}
openModal(): void {
  console.log('Opening modal with card:', this.card);
  if (!this.card) {
    console.error('Card is undefined when opening modal');
    return;
  }
  this.showEditModal = true;
}

closeModal(): void {
  console.log('Closing modal'); 
  this.showEditModal = false;
}


submitEdit($event: Event): void {
  $event.preventDefault();  
  console.log('Submitting edit for card:', this.card);
  this.cardService.updateCard(this.card.id, this.card).subscribe(updatedCard => {
    console.log('Card updated successfully:', updatedCard);
    this.cardUpdated.emit(updatedCard);
    this.closeModal();
  }, error => {
    console.error('Failed to update card:', error);
  });
}
}