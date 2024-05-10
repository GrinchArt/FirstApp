import { Component, OnInit } from '@angular/core';
import{ ListService } from '../list.service';
import{ List } from '../list';
import { AddListComponent } from '../add-list/add-list.component';
import { ViewChild } from '@angular/core';
import { ActivityLogComponent} from '../activity-log/activity-log.component';
import{ ActivityLog, ActivitylogService } from '../activitylog.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  lists: List[] = [];
  showActivityLog = false;
  @ViewChild(AddListComponent) addListComponent!: AddListComponent;
  @ViewChild(ActivityLogComponent) activityLogComponent!: ActivityLogComponent;
  constructor(private listService: ListService, private activityLogService: ActivitylogService) {}

  ngOnInit(): void {
    this.fetchLists();
  }


  toggleActivityLog(): void {
    this.showActivityLog = !this.showActivityLog;  
    if (this.showActivityLog && this.activityLogComponent) {
      this.activityLogComponent.loadActivities();  
    }
  }
  fetchLists(): void {
    this.listService.getLists().subscribe(lists => {
      this.lists = lists;
    }, error => {
      console.error('Error fetching lists:', error);
    });
  }

  addNewList(): void {
    this.addListComponent.openModal();
  }
  handleListRemoval(listId: number): void {
    this.lists = this.lists.filter(list => list.id !== listId);
    this.activityLogService.logActivity({
      cardId: listId,
      actionName: 'Delete List',
      details: 'Deleted a list with ID: ' + listId,
      timestamp: new Date().toISOString()
    }).subscribe();
  }

  addList(listName: string): void {
    this.listService.createList(listName).subscribe(
      newList => {
        this.lists.push(newList);
        this.activityLogService.logActivity({
          cardId: newList.id,
          actionName: 'Create List',
          details: 'Added a new list with name: ' + newList.name,
          timestamp: new Date().toISOString()
        }).subscribe();
      },
      error => {
        console.error('Failed to create new list:', error);
      }
    );
  }
}
