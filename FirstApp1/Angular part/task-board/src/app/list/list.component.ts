import { Component,OnInit, Input,EventEmitter,Output,ViewChild } from '@angular/core';
import { ListService } from '../list.service';
import { List } from '../list';
import { Card } from '../card';
import { CardService } from '../card.service';
import { EditListComponent } from '../edit-list/edit-list.component';
import { AddCardComponent } from '../add-card/add-card.component';
import { EditCardComponent } from '../edit-card/edit-card.component';
import{ ActivityLog, ActivitylogService } from '../activitylog.service';
import { CarddescriptionComponent } from '../carddescription/carddescription.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list!: List;
  @ViewChild(EditCardComponent) editCardComponent!: EditCardComponent;
  @ViewChild(EditListComponent) editListComponent!: EditListComponent;
  @ViewChild(AddCardComponent) addCardComponent!: AddCardComponent;
  @ViewChild(CarddescriptionComponent) cardDescriptionComponent!: CarddescriptionComponent;

  cards: Card[] = [];
  @Output() listRemoved = new EventEmitter<number>();
  @Output() listUpdated = new EventEmitter<void>();
  selectedCard: Card | null = null;
  selectedCardLogs: ActivityLog[] = [];
  constructor(private cardService: CardService, private listService: ListService, private activityLogService: ActivitylogService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.cardService.getCardsByListId(this.list.id).subscribe(cards => {
      this.cards = cards;
      console.log('Cards loaded:', cards);
    }, error => {
      console.error('Failed to load cards:', error);
    });
  }

  openInfoModal(card: Card): void {
    this.selectedCard = card;
    this.activityLogService.getActivitiesByCardId(card.id).subscribe(logs => {
        this.selectedCardLogs = logs; 
        this.cardDescriptionComponent.activityLogs = this.selectedCardLogs;
        this.cardDescriptionComponent.openModal();
    });
}

  selectCard(card: Card): void {
    this.selectedCard = card;
    this.loadActivityLogs(card.id);
    this.changeDetectorRef.detectChanges();
    this.cardDescriptionComponent.openModal();
  }
  loadActivityLogs(cardId: number): void {
    this.activityLogService.getActivitiesByCardId(cardId).subscribe(logs => {
      this.selectedCardLogs = logs;
    }, error => {
      console.error('Error loading activity logs:', error);
    });
  }

  removeList(): void {
    this.listService.deleteList(this.list.id).subscribe(() => {
      this.listRemoved.emit(this.list.id);
      this.activityLogService.logActivity({
        cardId: this.list.id, 
        actionName: 'Delete List',
        details: 'Deleted list with ID: ' + this.list.id,
        timestamp: new Date().toISOString()
      }).subscribe();
    }, error => {
      console.error('Error removing list:', error);
    });
  }

  handleUpdate(updatedList: List): void {
    this.listService.updateList(updatedList.id, updatedList).subscribe(updated => {
      this.list = updated;
      this.listUpdated.emit();
      this.activityLogService.logActivity({
        cardId: updatedList.id, 
        actionName: 'Update List',
        details: 'Updated list details for list: ' + updatedList.name,
        timestamp: new Date().toISOString()
      }).subscribe();
    }, error => {
      console.error('Error updating list:', error);
    });
  }

onCardAdded(newCard: Card): void {
    this.cards.push(newCard);
  }
  openEditCardModal(card: Card): void {
    if (!card) {
      console.error('Attempt to open edit modal with null card data');
      return;
    }
    this.editCardComponent.card = card;
    this.editCardComponent.openModal();
  }

  onCardUpdated(updatedCard: Card): void {
    const index = this.cards.findIndex(card => card.id === updatedCard.id);
    if (index !== -1) {
      this.cards[index] = updatedCard; 
    }
  }

  onCardChanged(): void {
    this.loadCards(); 
  }

  addCard(): void {
    this.addCardComponent.card.listId = this.list.id; 
    this.addCardComponent.openModal(); 
  }
  
}