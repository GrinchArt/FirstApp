import { Component, OnInit, Input,EventEmitter } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { Output} from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';
import { ActivityLog, ActivitylogService } from '../activitylog.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card!: Card;  
  @Output() requestEdit = new EventEmitter<Card>();
  @Output() cardChanged = new EventEmitter<void>();
  @Output() requestInfo = new EventEmitter<Card>();
  lists: List[] = [];

  constructor(private cardService: CardService,private listService: ListService,private activitylogService: ActivitylogService) { }

  ngOnInit(): void {
    this.fetchLists();
  }

  triggerInfo(): void {
    this.requestInfo.emit(this.card);  
  }
 
  fetchLists(): void {
    this.listService.getLists().subscribe(
      lists => this.lists = lists,
      error => console.error('Failed to load lists:', error)
    );
  }
  changeList(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const newListId = Number(selectElement.value);

  if (!isNaN(newListId) && newListId !== this.card.listId) {
    this.card.listId = newListId;
    this.cardService.updateCard(this.card.id, this.card).subscribe({
      next: (updatedCard) => {
        this.activitylogService.logActivity({
          cardId: updatedCard.id,
          actionName: 'Move Card',
          details: `Moved card to list ${newListId}`,
          timestamp: new Date().toISOString()
        }).subscribe();
        this.cardChanged.emit(); 
      },
      error: (error) => console.error('Failed to update card:', error)
    });
  }
}
  deleteCard(id: number): void {
    this.cardService.deleteCard(id).subscribe(() => {
      const activityLog: ActivityLog = {
        cardId: id,
        actionName: 'Delete Card',
        details: 'Deleted a card '+ id,
        timestamp: new Date().toISOString()
      };
      this.activitylogService.logActivity(activityLog).subscribe();
      this.cardChanged.emit(); 
    }, error => {
      console.error('Failed to delete card:', error);
    });
  }
  triggerEditCard(): void {
    this.requestEdit.emit(this.card);
  }
  updateCard(card: Card): void {
    this.cardService.updateCard(card.id, card).subscribe({
      next: (updatedCard) => {
        const activityLog: ActivityLog = {
          cardId: updatedCard.id,
          actionName: 'Update Card',
          details: 'Updated card details'+ updatedCard.name+''+updatedCard.id,
          timestamp: new Date().toISOString()
        };
        this.activitylogService.logActivity(activityLog).subscribe();
        this.cardChanged.emit(); 
      },
      error: (error) => {
        console.error('Failed to update card:', error);
      }
    });
  }
  
}