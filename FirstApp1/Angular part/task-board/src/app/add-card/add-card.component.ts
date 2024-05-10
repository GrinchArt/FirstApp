import { Component, Output, EventEmitter } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { ActivitylogService, ActivityLog } from '../activitylog.service';


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent {
  card: Card = { id: 0, name: '', description: '', dueDate: new Date(), priority: 'Low', listId: 0 };
  @Output() cardAdded = new EventEmitter<Card>();
  show: boolean = false; 
  constructor(private cardService: CardService, private activitylogService: ActivitylogService) {}

  openModal(): void {
    this.show = true; 
  }

  closeModal(): void {
    this.show = false;
  }
  addCard(): void {
    if (this.card.name.trim()) {
      this.cardService.createCard(this.card).subscribe({
        next: (newCard) => {
          this.activitylogService.logActivity({
            cardId: newCard.id,
            actionName: 'Create Card',
            details: 'Added a new card',
            timestamp: new Date().toISOString()
          }).subscribe();
          this.cardAdded.emit(newCard); 
          this.closeModal();  
          this.resetForm();
        },
        error: (error) => {
          console.error('Failed to add card:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.card = { id: 0, name: '', description: '', dueDate: new Date(), priority: 'Low', listId: this.card.listId };
  }
}